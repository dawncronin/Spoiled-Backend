const express = require('express')
const router = new express.Router()
const Gift = require('../models/gift')
const auth = require('../middleware/auth')

router.post('/gifts', auth, async (req, res) => {
    console.log(req.body)
    let gift = new Gift(req.body)

    try {
        await gift.save()
        res.status(201).send()
    } catch(e) {
        res.status(400).send()
    }
})

router.delete('/gifts/:id', auth, async (req, res) => {
    if (!req.user._id.equals(gift.user_id)) {
        res.status(401).send()
    }
    await Gift.deleteOne({_id: req.params.id})
    res.send()
})

router.patch('/gifts/:id', auth, async (req, res) => {
    let user = req.user
    let gift = await Gift.findById(req.params.id)

    if (!user._id.equals(gift.user_id)) {
        res.status(401).send()
    }

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
    res.send(gift)
})

module.exports = router

