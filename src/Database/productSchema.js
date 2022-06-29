const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

let productSchema = new Schema({
    productName:{
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productMarketplace:{
        type: ObjectId,
        ref: 'marketplace'
    },
    productReviews:{
        type: ObjectId,
        ref: 'review'
    },
    productRating:{
        type: Number,
    },
    productPrice:{
        type: Number,
        required: true
    },
    productCreator:{
        type: ObjectId,
        ref: 'user',
        required: true
    }
})

let product = model('product', productSchema)

module.exports = product