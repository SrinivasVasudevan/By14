const asyncErrorHandler = async (err, req, res, next)=>{
    return res.status(500).send({msg:`Something went wrong. Please try again later`, err:err})
}

module.exports = asyncErrorHandler