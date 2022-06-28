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

    reviewRating:{
        type: Number,
        required: false
    }
    
})

let review = model('review', reviewSchema)

module.exports = review