const mongoose = require('mongoose')

const Items = mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please enter a name to save item']
    },
    price: {
        type: Number,
        required: [true, 'Please enter the price of the item']
    }
    ,
    category: {
        type: String,
        default: 'Misc'
    }    
})

const model = mongoose.model('items', Items)

module.exports = model