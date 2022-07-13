const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

let reviewSchema = new Schema({

    reviewOwner:{
        type: ObjectId,
        required: true,
        ref: 'user'
    },

    reviewContent:{
        type: String,
        required: true,
        maxLength: 120
    },

    positiveRatings:{
        type: ObjectId,
        required: false,
        ref: 'user'
    },

    negativeRatings:{
        type: ObjectId,
        required: false,
        ref: 'user'
    }
    
})

let review = model('review', reviewSchema)

module.exports = review