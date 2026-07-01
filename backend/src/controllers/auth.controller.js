import { z } from 'zod';
import { User } from '../models/user.model.js';
import { RefreshToken } from '../models/RefreshToken.model.js';
import { createRefreshToken, hashRefreshToken, signAccessToken } from '../services/tokenService.js';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export async function registerController(req, res, next) {
  try {
    const input = registerSchema.parse(req.body);
    const existingUser = await User.findOne({ email}).exec();
    const passwordHash = await User.hashPassword(input.password);
    const user = await User.create(
    {
      name: input.name,
      email: input.email,
      passwordHash
    }
    );
    res.status(201).json({ id: user._id, email: user.email, role: user.role });
  } catch (error) {
    next(error);
  }
}

export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = signAccessToken(user);
    const refreshToken = await createRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
}

export async function refreshController(req, res, next) {
  try {
    const rawToken = req.cookies.refreshToken;
    if (!rawToken) return res.status(401).json({ message: 'Refresh token missing' });

    const tokenHash = hashRefreshToken(rawToken);
    const stored = await RefreshToken.findOne({ tokenHash, revokedAt: null }).populate('user');

    if (!stored || stored.expiresAt < new Date()) {
      return res.status(401).json({ message: 'Refresh token invalid' });
    }

    const accessToken = signAccessToken(stored.user);
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    const rawToken = req.cookies.refreshToken;
    if (rawToken) {
      await RefreshToken.updateOne({ tokenHash: hashRefreshToken(rawToken) }, { revokedAt: new Date() });
    }
    res.clearCookie('refreshToken');
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
