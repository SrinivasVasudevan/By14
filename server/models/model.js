const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'please fill the name section']
    },
    price: {
        type:Number,
        required: [true, 'please fill the price section']
    }

})

module.exports = mongoose.model('transactions',TransactionSchema)