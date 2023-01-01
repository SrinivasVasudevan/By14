const asyncErrorHandler = async (err,req,res,next)=>{
    console.log(err.message)
    if(err.message==="Database Empty"||err.message==='the id used does not exist..')
    {
        return res.status(404).json({msg:err.message, err})
    }
    res.status(500).json({msg:'Error occured please try again later..', err:err.message})
}

module.exports = asyncErrorHandler