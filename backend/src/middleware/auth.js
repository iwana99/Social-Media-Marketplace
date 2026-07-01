import jwt from "jsonwebtoken";
export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization||""; 
    
    const token= authHeader.startsWith('Bearer ')?authHeader.slice(7):null;

    if(!token) {
        return res.status(401).json({message:"Access token is missing"});
    }
        try{
            req.user=jwt.verify(token,process.env.JWT_ACCESS_SECRET);
            next();
        }
        catch(error)
        {
            return res.status(401).json({message:"Access token is invalid"});
        }
    

}



export const authRole = (roles) => {

    return (req, res, next) => {
        if(req.user?.role===role)
        {
            next();
        }
        else
        {
            return res.status(401).json({message:"Unauthorized"});
        }
    }
}