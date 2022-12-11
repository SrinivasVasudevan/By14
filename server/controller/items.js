const Items = require('../model/Items')

const createItem = async (req,res)=>{
    const {name} = req.body 
    const items = await Items.create({name})
    res.status(201).json({msg: 'Created Successfully' ,items})
}

const getItem = async (req,res)=>{
    const {id: itemID} = req.params
    console.log(itemID);
    const items = await Items.findOne({_id:itemID})
    if(!items)
    {
        throw new Error('Item not found')
    }
    res.status(200).json({msg: 'Found Successfully' ,items})
}

const updateItem = async (req,res)=>{
    const {id: itemID} = req.params
    console.log(itemID);
    const {name} = req.body
    const items = await Items.findOneAndUpdate({_id:itemID},{name},{runValidators:true, new:true})
    if(!items)
    {
        throw new Error('Item not found')
    }
    res.status(200).json({msg: 'Updates Successfully' ,items})
}

const deleteItem = async (req,res)=>{
    const {id: itemID} = req.params
    console.log(itemID);
    const items = await Items.findOneAndDelete({_id:itemID})
    if(!items)
    {
        throw new Error('Item not found')
    }
    res.status(200).json({msg: 'Deleted Successfully' ,items})
}

const getAllItems = async (req,res)=>{
    const items = await Items.find({})
    if(!items)
    {
        throw new Error('Collection empty')
    }
    res.status(200).json({msg: 'Read all items Successfully' ,items, nHits:items.length})
}

const getAllStatic = async (req,res)=>{
    const items = await Items.find({})
    if(!items)
    {
        throw new Error('Collection empty')
    }
    res.status(200).json({items})
}


module.exports = {
    getAllItems ,
    getAllStatic,
    createItem,
    getItem,
    updateItem,
    deleteItem
}
