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
    description: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product