const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

let marketplaceSchema = new Schema({

    marketplaceOwner:{
        type: ObjectId,
        ref: 'user'
    },

    marketplaceDescription:{
        type: String,
        maxLength: 120
    },

    marketplaceRating:{
        type: Number
    },

    marketplaceProducts: {
        type: [ObjectId],
        ref: 'product'
    },

    marketplaceReviews:{
        type: [ObjectId],
        ref: 'product'
    }
    
})

let marketplace = model('marketplace', marketplaceSchema)

module.exports = marketplace