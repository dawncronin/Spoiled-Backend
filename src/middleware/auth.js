const User = require('../models/user')
const jwt = require('jsonwebtoken')


const auth = async function(req, res, next) {
    try {
        let token = req.headers.authorization.replace("Bearer ", "")
        let decoded = jwt.verify(token, "bologne")
        let user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if (!user) {
            throw new Error
        }
        req.user = user
        req.token = token
        next()
    } catch (e) {
        res.status(401).send("Unable to Authenticate")
        }

}

module.exports = auth