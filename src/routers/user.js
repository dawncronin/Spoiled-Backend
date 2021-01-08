const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')


router.get('/users', auth, (req, res) => {
    res.send('Here are the users')
}, (e) => {
    res.status(400).send(e)
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({token})
    } catch (e){
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    let user = await User.login(req.body.email, req.body.password)
    let token = await user.generateAuthToken()
    res.status(201).send({token})
}, (e) => {
    res.status(400).send()
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token != req.token
        })
        req.user.save()
        res.send()
    } catch (e) {
        res.status(400).send()
    }

})



  
module.exports = router