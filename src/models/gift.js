let mongoose = require('mongoose')
let Schema = mongoose.Schema

let giftSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
         ref: 'User',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    purchased: {
        type: Boolean,
        default: false
    }
})

let Gift = mongoose.model('Gift', giftSchema)

module.exports = Gift