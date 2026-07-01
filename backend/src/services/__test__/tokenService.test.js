import {describe,it,expect, beforeEach,vi} from "vitest"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import {RefreshToken} from "../../models/refreshToken.model.js"
import {createRefreshToken,hashRefreshToken,signAccessToken} from '../tokenService.js'

vi.mock("../../models/refreshToken.model.js",()=>{
    return {RefreshToken:{
        create:vi.fn()}}
})



describe("token Service",()=>{

    beforeEach(()=>{
        vi.clearAllMocks();
        process.env.JWT_ACCESS_SECRET="secret";
    })


    it("should signAccessToken create jwt",async()=>{
      const user={
            _id:"123",
            role:"user"
        };

        const accessToken=await signAccessToken(user);
        const decoded=jwt.verify(accessToken,process.env.JWT_ACCESS_SECRET);
        expect(decoded.sub).toBe("123");
        expect(decoded.role).toBe("user");



    });
    it("should hashRefreshToken create sha256 ",async()=>{
        const rawToken= "123123123"
        

    })
    it("should create createRefreshToken return raw token",async()=>{})
})