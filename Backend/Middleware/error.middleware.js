const errorMiddlware = (err,req,res,next)=>{
    
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Something went wrong'

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        stack:err.stack,

    })
}

export default errorMiddlware;