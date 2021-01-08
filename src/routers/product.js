const express = require('express')
const router = new express.Router()
const Product = require('../models/product')

router.get('/products', (req, res) => {
    res.send('here are the products')
})

router.post('/products', async (req, res) => {
    let product = new Product(req.body)
    try {
        product.save()
        res.send()
    } catch (e) {
        res.status(400).send()
    }
})



module.exports = router