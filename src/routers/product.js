const express = require('express')
const router = new express.Router()
const Product = require('../models/product')

router.get('/products', (req, res) => {
    res.send('here are the products')
})

router.post('/products', async (req, res) => {
    let product = new Product(req.body)
    try {
        await product.save()
        res.status(201).send()
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/products/:id', async(req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        res.status(401).send()
    }
    res.send(product)
})

module.exports = router