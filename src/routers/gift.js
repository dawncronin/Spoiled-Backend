const express = require('express')
const router = new express.Router()
const Gift = require('../models/gift')

router.post('/gifts', async (req, res) => {
    let gift = new Gift(req.body)

    try {
        await gift.save()
        res.status(201).send()
    } catch(e) {
        res.status(400).send()
    }
})

router.delete('/gifts/:id', async (req, res) => {
    res.send()
})

router.patch('/gifts/:id', async (req, res) => {

})

router.get('/gifts/:id', (req, res) => {
    res.send()
})

module.exports = router

