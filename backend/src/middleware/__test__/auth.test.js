import jwt from "jsonwebtoken";
import {describe,it,expect, beforeEach,vi} from "vitest"
import {requireAuth} from "../auth.js"

function mockResponse()
{
    const res={}
    res.status=vi.fn().mockReturnValue(res)
    res.json=vi.fn().mockReturnValue(res)
    return res
}
describe("auth middleware",()=>{
    beforeEach(()=>{
        process.env.JWT_ACCESS_SECRET="123"
    })
    it("should requireAuth return 401,token is missing",()=>{
         
         const req={headers:{}};
          
         const res=mockResponse();
         const next=vi.fn();
         requireAuth(req,res,next);

         expect(res.status).toHaveBeenCalledWith(401);
         expect(res.json).toHaveBeenCalledWith({message:"Access token is missing"})
         expect(next).not.toHaveBeenCalled()

         
        
    })
    it("should requireAuth return with token and return next()",()=>{
      const token=jwt.sign(
              {sub:"user-123",
              role: "admin"},
      
                  process.env.JWT_ACCESS_SECRET,
                  {expiresIn:'15m'},
              )

              const req={headers:{authorization:`Bearer ${token}`}}


        
         const res=mockResponse();
         const next=vi.fn();
         requireAuth(req,res,next);

         expect(req.user.sub).toBe("user-123")
         expect(req.user.role).toBe("admin")
         
         expect(next).toHaveBeenCalledTimes(1)



    })

    it("should have role",()=>{})
    it("role should be Unauthorized return 401",()=>{})


})