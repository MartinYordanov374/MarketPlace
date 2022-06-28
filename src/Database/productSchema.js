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
    }
})

let product = model('product', productSchema)

module.exports = product