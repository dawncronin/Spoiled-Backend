const express = require('express')
const router = new express.Router()
const User = require('../models/user')


router.get('/users', (req, res) => {
    res.send('Here are the users')
})

router.post('/users', async (req, res) => {
    console.log('hello')
    const user = new User(req.body)
    try {
        await user.save()
        res.send()
    } catch (e){
        res.status(404).send()
    }
})


module.exports = router