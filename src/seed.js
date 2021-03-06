const Product = require('./models/product')
const mongoose = require("mongoose");
const faker = require('faker')

require('dotenv').config()

//name commerce/productName
//price commerce/price
//description commerce/productDescription
//department commerce/department
//color commerce/color
//picture image/fashion



mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}) 

for (let i = 0; i < 100; i++) {
    const randomName = faker.commerce.productName()
    const randomPrice = faker.commerce.price()
    const randomDescription = faker.commerce.productDescription()
    const randomDepartment = faker.commerce.department()
    const randomImage = faker.image.image()

    let demo = new Product({
        name: randomName,
        price: randomPrice/10,
        image: randomImage,
        description: randomDescription,
        department: randomDepartment
    })
    
    demo.save()
    
}
