const Transaction = require('../models/model.js')

const getAllTransactionsStatic = async (req,res)=>{
    const result = await Transaction.find({})
    res.status(200).send({nhits:result.length, transactions:result})
}

const getAllTransactions = async (req,res)=>{
    const result = await Transaction.find({})
    if(!result || !result.length) throw new Error("Database Empty")
    res.status(200).send({nhits:result.length, transactions:result})
}

//create
const createTransaction = async (req,res)=>{
    const {name, price} = req.body
    const result = await Transaction.create({name,price})
    if(!result) throw new Error('some error occured please try again later..')
    res.status(201).send({message:'successfully created',transaction:result})
}
//read
const getOneTransaction = async (req,res)=>{
    const {id: transactionID} = req.params
    const result = await Transaction.findOne({_id: transactionID})
    if(!result) throw new Error('the id used does not exist..')
    res.status(200).send({message:'successfully fetched',transaction:result})
}
//update
const updateTransaction = async (req,res)=>{
    const {id: transactionID} = req.params
    const {name, price} = req.body
    const result = await Transaction.findOneAndUpdate({_id: transactionID},{name, price},{runValidators:true, new:true})
    if(!result) throw new Error('the id used does not exist..')
    res.status(200).send({message:'successfully updated',transaction:result})
}
//delete
const deleteTransaction = async (req,res)=>{
    const {id: transactionID} = req.params
    const result = await Transaction.findOneAndDelete({_id: transactionID})
    if(!result) throw new Error('the id used does not exist..')
    res.status(200).send({message:'successfully deleted',transaction:result})
}


module.exports = {
    getAllTransactionsStatic,
    getAllTransactions,
    getOneTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction
}