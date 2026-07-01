import jwt from "jsonwebtoken"
import crypto from "crypto"
import {RefreshToken} from "../models/refreshToken.model.js"


export const signAccessToken=(user)=>{
    return jwt.sign(
        {sub: user._id.toString(),
        role: user.role},

            process.env.JWT_ACCESS_SECRET,
            {expiresIn:'15m'},

)

}

export const createRefreshToken= async(user)=>{
    const rawToken=crypto.randomBytes(48).toString('hex');
    const tokenHash=hashRefreshToken(rawToken);

    await RefreshToken.create({
        user:user._id,
        tokenHash,
        expiresAt:new Date(Date.now()+7*24*60*60*1000)

}
)
return rawToken;
}

export const hashRefreshToken=(rawToken)=>{
    return crypto.createHash('sha256').update(rawToken).digest('hex')
}


