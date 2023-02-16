//handles async errors and fetch env variable for urlstring
require('express-async-errors')
require('dotenv').config()

const express= require('express')
const path = require('path');
const app = express()


const connectDB = require('./connect/connect')
const routes = require('./router/routes')
const {getAllTransactionsStatic} = require('./controller/transactions')

//error handling middlewares
const asyncErrorMiddleware = require('./middleware/async-errors-middleware')
const notFoundMiddleware = require('./middleware/not-found-middleware')

const portNumber = process.env.PORTNUMBER || 5005

app.use(express.json())

//routing to given paths
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/api/v1/transaction/',routes)
app.use('/api/v1/static/', getAllTransactionsStatic)

app.use(notFoundMiddleware)
app.use(asyncErrorMiddleware)


const start = async ()=>{
    await connectDB(process.env.urlString)
    app.listen((portNumber), ()=>{
    
        console.log(`listening to ${portNumber} ... `)
    })
}

start()
