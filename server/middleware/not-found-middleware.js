const notFoundHandler = (req, res)=>{
    res.status(404).send({msg:'404 Resource missing'})
}

module.exports = notFoundHandler