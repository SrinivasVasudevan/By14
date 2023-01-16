const CustomErrorApi = require("../errors/custom-errors")

const asyncErrorHandler = async (err,req,res,next)=>{
    console.log(err.message)
    if(err instanceof CustomErrorApi)
    {
        return res.status(err.statusCode).json({msg:err.message});
    }
    res.status(500).json({msg:'Error occured please try again later..', err:err.message})
}

module.exports = asyncErrorHandler