const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
    },   
    
    hashedPass: 
    { 
        type: String, 
        required: true 
    },

    rating:{
        type: [Object],
        required: false,
        ref: 'user'
    },

    reviews:{
        type: [ObjectId],
        ref: 'review'
    },

    marketplaces:{
        type: [ObjectId],
        ref: 'marketplace'
    },
    products:{
        type:[ObjectId],
        ref: 'product'
    },
    profilePicture:{
        type: Buffer,
        contentType: String,
        
    },

    covertPicture: {
        type: Buffer,
        contentType: String
    },
    productsInCart:{
        type: [ObjectId],
        ref: 'product'
    }
})

let user = model('user', UserSchema)
module.exports = user