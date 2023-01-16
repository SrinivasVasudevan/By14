const Transaction = require('../models/model.js')

const getAllTransactionsStatic = async (req,res)=>{
    const search = "Food";
    const result = await Transaction.find({
        category: {$regex: search, $options: 'i'},
    })
    res.status(200).send({nhits:result.length, transactions:result})
}

const getAllTransactions = async (req,res)=>{
    console.log(req.query)
    const {category, sort, numericFilters} = req.query
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
    console.log('here')
    const transactions = await result;

    if(!transactions || !transactions.length) throw new Error("Database Empty")
    res.status(200).send({nhits:transactions.length, transactions:transactions})
}

//create
const createTransaction = async (req,res)=>{
    let {name, amount, transactionDate, category} = req.body
    if(!transactionDate) transactionDate = new Date().toLocaleString();
    let timeStamp = new Date().toLocaleString();
    const result = await Transaction.create({name,amount,transactionDate, category, timeStamp})
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
    const {name,amount,transactionDate, category} = req.body
    const result = await Transaction.findOneAndUpdate({_id: transactionID},{name,amount,transactionDate, category},{runValidators:true, new:true})
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