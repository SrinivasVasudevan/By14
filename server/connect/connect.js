const mongoose = require('mongoose')

const connectDB = (urlString)=>{
    mongoose.connect(urlString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
}

mongoose.set('strictQuery', false);

module.exports = connectDB