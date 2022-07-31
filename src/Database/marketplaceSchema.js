const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

let marketplaceSchema = new Schema({

    marketplaceOwner:{
        type: ObjectId,
        ref: 'user',
        required: true
    },

    marketplaceName:{
        type: String,
        required: true,
    },

    marketplaceTags:{
        type: [String],
        required: true
    },

    marketplaceDescription:{
        type: String,
        maxLength: 120,
        required: true
    },

    marketplaceRating:{
        type: [Object],
        required: false,
        ref: 'user'
    },

    marketplaceProducts: {
        type: [ObjectId],
        ref: 'product'
    },

    marketplaceReviews:{
        type: [ObjectId],
        ref: 'review'
    },

    marketplaceImage:{
        data: Buffer,
        contentType: String
    }
    
})

let marketplace = model('marketplace', marketplaceSchema)

module.exports = marketplace