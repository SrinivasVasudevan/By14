const mongoose = require('mongoose')

const Items = mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please enter a name to save item']
    }
})

const model = mongoose.model('items', Items)

module.exports = model