import {describe, it, expect} from 'vitest';
import {User} from '../user.model';
import bcrypt from 'bcryptjs';

describe('User model', () => {
    it("should create hash password", async () => {
        const password = "myPassword123";
        const hash = await User.hashPassword(password);
        expect(hash).toBeDefined();
        expect(hash).not.toBe(password);
    });
    it("should create hash password that matches the original password", async () => {
        const password = "myPassword123";
        const hash = await User.hashPassword(password);
        const isMatch =await bcrypt.compare(password, hash);
        expect(isMatch).toBe(true);
    });
    it("should compare password and return true for correct password", async () => {
        const password = "myPassword123";
        const hash = await User.hashPassword(password);
        const user= new User({name: "Test User", email: "Tbq7K@example.com", passwordHash: hash, role: "user"});
        const isMatch = await user.comparePassword(password);
        expect(isMatch).toBe(true);
    });
    it("should compare password and return false for incorrect password", async () => {
        const password = "myPassword123";
        const wrongPassword = "wrongPassword";
        const hash = await User.hashPassword(password);
        const user= new User({name: "Test User", email: "Tbq7K@example.com", passwordHash: hash, role: "user"});
        const isMatch = await user.comparePassword(wrongPassword);
        expect(isMatch).toBe(false);
    });
    it("should set default role to 'user' if not provided", async () => {
        const user = new User({name: "Test User", email: "Tbq7K@example.com", passwordHash: "hashedPassword"});
        expect(user.role).toBe('user');
        
    });

});