
import {RefreshToken} from "../refreshToken.model.js";
import {describe, it, expect} from 'vitest';
import mongoose from "mongoose";

describe("RefreshToken model", () => {
    it("should create refresh token with required fields", async () => 
        {
            const userId= new mongoose.Types.ObjectId();
            const refreshToken= new RefreshToken(
                {user:userId,
                tokenHash:"hash-token",
                expiresAt:new Date(Date.now()+7*60*60*1000)
                }
            )
            const error= refreshToken.validateSync();
            expect(error).toBeUndefined();
            expect(refreshToken.user).toEqual(userId)
            expect(refreshToken.expiresAt).toBeInstanceOf(Date)
            expect(refreshToken.tokenHash).toBe("hash-token")


        })
        it("user should be defined",()=>
        {
            const refreshToken= new RefreshToken(
                {tokenHash:"token-hash",
                expireAt:new Date(Date.now()+7*60*60*1000)

        })
        const error= refreshToken.validateSync()
        expect(error.errors.user).toBeDefined()
        })

        it("revokeAt should be null by default",()=>{
            const refreshToken=new RefreshToken({
                user: new mongoose.Types.ObjectId(),
                tokenHash:"token-hash",
                expiredAt:new Date()
        })
        expect(refreshToken.revokedAt).toBeNull()
        })
});