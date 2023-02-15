const jwt = require('jsonwebtoken')
const CustomErrorApi = require('../errors/custom-errors.js');
const Transaction = require('../models/model.js')

const signup = async (req,res)=>{
    const {username, password} = req.body;
    if(!username || !password)
    {
        throw new CustomErrorApi('Please provide username and password', 500)
    }
    const id = new Date().getDay();
    const token = jwt.sign({id, username}, process.env.JWT_SECRET)
    res.status(200).json({id, username, token})
    console.log(username, password)

}

const dashboard = async (req,res)=>{
    const authHeaders = req.headers.authorization;
    console.log(authHeaders)
    if(!authHeaders || !authHeaders.startsWith('Bearer '))
    {
        throw new CustomErrorApi('No token provided', 400)
    }
    try {
        const decoded = jwt.verify(authHeaders.split(' ')[1], process.env.JWT_SECRET)
        console.log(decoded)
        return res.status(200).json(decoded)
    } catch (error) {
        throw new CustomErrorApi('Unauthorised user request', 401)
    }

}

const getAllTransactionsStatic = async (req,res)=>{
    const search = "Food";
    const result = await Transaction.find({
        category: {$regex: search, $options: 'i'},
    })
    res.status(200).send({nhits:result.length, transactions:result})
}

const getAllTransactions = async (req,res)=>{
    console.log(req.query)
    const {category, sort, numericFilters, page, limit} = req.query
    let queryObject = {}
    if(category)
    {
        queryObject.category = {$regex: category, $options: 'i'}
    }
    if(numericFilters)
    {
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "<": "$lt",
            "<=": "$lte",
            "=": "$eq"
        }
        const regEx = /\b(<|>|>=|<=|=)\b/g
        const filter = numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`)
        const options = ['dateRange', 'amount']
        const dateField = {'dateRange': 'transactionDate'}
        console.log(filter)
        filter.split(',').forEach(element => {
           
            const [queryField, queryOperator, queryvalue] = element.split('-')
            console.log(queryField, queryOperator, queryvalue)
            if(options.includes(queryField))
            {
                
                if(queryField === 'dateRange')
                {
                    const date = new Date();
                    date.setDate(date.getDate() - Number(queryvalue));
                    console.log(dateField[queryField]);
                    queryObject[dateField[queryField]] = {...queryObject[dateField[queryField]],[queryOperator]: date};
                }
                else{
                    queryObject[queryField] = {...queryObject[queryField],[queryOperator]: queryvalue}
                }
                
                
            }
        });
        console.log(queryObject)
    }

    let result =  Transaction.find(queryObject)
    if(sort)
    {
        result = result.sort(sort.split(',').join(' '))
    }
    else{
        result = result.sort('createAt')
    }
    if(page && limit)
    {
        result = result.limit(limit).skip((page-1)*limit)
    }
    else{
        result = result.limit(limit)
    }
    const transactions = await result;

    if(!transactions || !transactions.length) throw new CustomErrorApi("Database Empty",404)
    res.status(200).send({nhits:transactions.length, transactions:transactions})
}

//create
const createTransaction = async (req,res)=>{
    let {name, amount, transactionDate, category} = req.body
    if(!transactionDate) transactionDate = new Date().toLocaleString();
    else transactionDate = new Date(transactionDate)
    let timeStamp = new Date();
    console.log(transactionDate, timeStamp)
    const result = await Transaction.create({name,amount,transactionDate, category, timeStamp})
    if(!result) throw new CustomErrorApi('some error occured please try again later..',500)
    res.status(201).send({message:'successfully created',transaction:result})
}
//read
const getOneTransaction = async (req,res)=>{
    const {id: transactionID} = req.params
    const result = await Transaction.findOne({_id: transactionID})
    if(!result) throw new CustomErrorApi('the id used does not exist..',400)
    res.status(200).send({message:'successfully fetched',transaction:result})
}
//update
const updateTransaction = async (req,res)=>{
    const {id: transactionID} = req.params
    const {name,amount,transactionDate, category} = req.body
    const result = await Transaction.findOneAndUpdate({_id: transactionID},{name,amount,transactionDate, category},{runValidators:true, new:true})
    if(!result) throw new CustomErrorApi('the id used does not exist..',400)
    res.status(200).send({message:'successfully updated',transaction:result})
}
//delete
const deleteTransaction = async (req,res)=>{
    const {id: transactionID} = req.params
    const result = await Transaction.findOneAndDelete({_id: transactionID})
    if(!result) throw new CustomErrorApi('the id used does not exist..',400)
    res.status(200).send({message:'successfully deleted',transaction:result})
}
//getMetaData very ineffecient
const getMetaData = async (req,res)=>{
    const result = await Transaction.find({});
    if(!result || !result.length) throw new CustomErrorApi("Database Empty",404)
    res.status(200).send({message:'successfully queried all data',nHits:result.length})
    
}

module.exports = {
    signup,
    dashboard,
    getAllTransactionsStatic,
    getAllTransactions,
    getOneTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getMetaData
}