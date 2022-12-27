require('express-async-errors')
require('dotenv').config()

const express = require('express')
const app = express()
const routes = require('./router/routes')
const connectDB = require('./database/connect')

//temporary static route -- controller
const {getAllStatic} = require('./controller/items')

//error handling middleware and 404 handler
const asyncErrorHandlerMiddleware = require('./middleware/async-error-middleware')
const notFoundMiddleware = require('./middleware/not-found-middleware')

//middlewares

app.use(express.json())

app.use('/api/v1/items',routes)

//temporary static route -- request route
app.get('/api/v1/static',getAllStatic)

app.use(notFoundMiddleware)
app.use(asyncErrorHandlerMiddleware)


const portNumber = process.env.PORTNUMBER || 5005

const start = async ()=>{
    try
    {
        console.log(process.env.connect)
        await connectDB(process.env.connect)
        app.listen(portNumber, ()=>{
            console.log(`Listening to ${portNumber}...`)
        })
    }
    catch(error)
    {
        console.log(error);
    }
}

start()


