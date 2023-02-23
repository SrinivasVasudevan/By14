const notFoundHandler = (req,res)=>{
    res.status(404).json({msg:'The resource you are looking for is not available'})
}

module.exports = notFoundHandler