export const errorHandler=(error,req,res,next)=>{
    console.error(error);
    const status= error.statusCode || 500;
    res.status(status).json({message:status ===500?"internal server error":error.message})

}
