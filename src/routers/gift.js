const express = require('express')
const router = new express.Router()
const Gift = require('../models/gift')
const Product = require('../models/product')
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/gifts', auth, async (req, res) => {
    let gift = new Gift(req.body)

    try {
        await gift.save()
        res.status(201).send()
    } catch(e) {
        res.status(400).send()
    }
})

router.delete('/gifts/:id', auth, async (req, res) => {

    let gift = await Gift.findById(req.params.id)

    if (!gift || !req.user._id.equals(gift.user_id)) {
        res.status(401).send()
    }
    await Gift.deleteOne({_id: req.params.id})
    res.send()
})

router.put('/gifts/:id', async (req, res) => {
    let gift = await Gift.findById(req.params.id)

    const attributes = ['purchased']
    for (key in req.body) {
        if (attributes.includes(key)){
            gift[key] = req.body[key]
        }
    }
    try {
        await gift.save()
        res.send(gift)
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/gifts/:id', async (req, res) => {
    let gift = await Gift.findById(req.params.id)
    let product = await Product.findById(gift.product_id)
    let user = await User.findById(gift.user_id)
    res.send( {product, user})
})

router.get('/gifts/user/:id', async (req, res) => {
    let gifts = await Gift.find({user_id: req.params.id}).
        populate('product')

    res.send(gifts)
})

module.exports = router

