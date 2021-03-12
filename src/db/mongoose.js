const mongoose = require('mongoose')
require('dotenv')

// /users/dawnc/mongodb/bin/mongod.exe --dbpath=/users/dawnc/mongodb-data

const connection = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/spoiled_api'
mongoose.connect(connection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}) 


