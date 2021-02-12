const mongoose = require('mongoose')

// /users/dawnc/mongodb/bin/mongod.exe --dbpath=/users/dawnc/mongodb-data
mongoose.connect('mongodb://127.0.0.1:27017/spoiled_api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}) 


