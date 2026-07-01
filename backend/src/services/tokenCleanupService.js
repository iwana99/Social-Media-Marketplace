import {RefreshToken} from "../models/refreshToken.model.js"

export const tokenCleanupService=async()=>{
    const result = await RefreshToken.deleteMany({
        expiresAt:{$lt:new Date()}
    });
    console.log(`Deleted ${result.deletedCount} expired refresh token(s)`);
    return result.deletedCount;

}