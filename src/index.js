const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./db/mongoose')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
const giftRouter = require('./routers/gift')


const app = express()
const port = process.env.PORT || 3001

app.use(cors());
app.options('*', cors());

app.use(express.json())
app.use(userRouter)
app.use(productRouter)
app.use(giftRouter)

app.get('/', (req, res) => {
    res.send("Subscribe to Technoblade")
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})