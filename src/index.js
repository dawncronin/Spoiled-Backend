const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')


const app = express()
const port = 3000

app.use(express.json())
app.use(userRouter)
app.use(productRouter)

app.get('/', (req, res) => {
    res.send("Subscribe to Technoblade")
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})