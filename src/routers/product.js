const express = require('express')
const router = new express.Router()

router.get('/products', (req, res) => {
    res.send('here are the products')
})



module.exports = router