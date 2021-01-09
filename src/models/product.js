const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        validate(value) {
            if (value <= 0) {
                throw new Error('Price must be greater than zero')
            }
        }
    },
    link: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error('URL invalid')
            }
        }
    }
})

// ProductSchema.pre('save', async (next) => {
//     next
// })

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product