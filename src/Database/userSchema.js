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
        type: [Number],
        required: false
    },

    reviews:{
        type: [ObjectId],
        ref: 'review'
    },

    marketplaces:{
        type: [ObjectId],
        ref: 'marketplaces'
    },

    profilePicture:{
        type: Buffer,
        contentType: String,
        required: false
    },

    covertPicture: {
        type: Buffer,
        contentType: String,
        required: false
    }
})

let user = model('user', UserSchema)
module.exports = user