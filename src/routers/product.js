const express = require('express')
const router = new express.Router()
const Product = require('../models/product')
const auth = require('../middleware/auth')

router.get('/products', async (req, res) => {
    let products = await Product.find({}).limit(10)
    res.send(products)
})

router.post('/products', auth, async (req, res) => {
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

router.patch('/products/:id', auth, async (req, res) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        res.status(404).send()
    }

    const attributes = ['name', 'price', 'link']

    for (key in req.body) {
        if (attributes.includes(key)){
            product[key] = req.body[key]
        }
    }

    try {
        await product.save()
        res.send(product)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/products/:id', auth, async (req, res) => {
    let product = await Product.findOneAndDelete(req.params.id)
    if (!product) {
        res.status(404).send()
    }
    res.send(product)
})

module.exports = router