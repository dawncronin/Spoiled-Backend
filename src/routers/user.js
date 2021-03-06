const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const Gift = require('../models/gift')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({token, user})
    } catch (e){
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.login(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).send({token, user})
    } catch (e){
        res.status(400).send('fuck you')
    }
})

router.get('/users/auth', auth, async (req,res) => {
    res.status(201).send(req.user)
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

router.get('/users/me', auth, async (req, res) => {
    let user = req.user

    try {
        let gifts = await Gift.find({user_id: user._id})
        res.send({user, gifts})    
    } catch (e) {
        res.status(500).send()
    }


})

router.get('/users/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
        let gifts = await Gift.find({user_id: user._id})
        res.send({user, gifts})    
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users', async (req, res) => {
    try {
        let users = await User.find({})
        res.send({users})    
    } catch (e) {
        res.status(500).send()
    }
})

router.put('/users/me', auth, async (req, res) => {
    let user = req.user
    try {
        await User.login(req.body.old_email, req.body.old_password)
    } catch (e) {
        res.status(401).send(e)
    }
    const attributes = ['first_name', 'last_name', 'email', 'password']
    for (key in req.body) {
        if (attributes.includes(key)){
            user[key] = req.body[key]
        }
    }
    try {
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/users/me', auth, async(req, res) => {
    try{
        await req.user.remove()
        res.send()
    } catch (e) {
        res.status(400).send()
    }

})
  
module.exports = router