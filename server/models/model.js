const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'please fill the name section']
    },
    amount: {
        type:Number,
        required: [true, 'please fill the amount section']
    },
    transactionDate: {
        type:Date,
        default: new Date().toLocaleString()
    },
    timeStamp: {
        type:Date,
        default: new Date().toLocaleString()
    },
    category: {
        type:String,
        default: 'Miscellaneous'
    }

})

module.exports = mongoose.model('transactions',TransactionSchema)