let userModel = require('../../Database/userSchema')
let productModel = require('../../Database/productSchema')

const mongoose = require('mongoose')
const { checkUserExistsById } = require('./checkUserExistsById')
const { findProductById } = require('../productAPI/findProductById')
async function AddProductToCart( productID, userID )
{

    try{
        
        // TODO HANDLE THE CASE WHERE THE USER OR THE PRODUCT DO NOT EXIST
        let targetUser = await userModel.findById({_id: userID})
    
        let targetProduct = await productModel.findById({_id: productID})

        if(targetUser.productsInCart.includes(productID))
        {
            throw new Error('You already have that product in your cart!')
        }
        else
        {
            targetUser.productsInCart.push(productID)
            await targetUser.save()
            return {status: 200, msg: 'Product added to cart'}
        }
    }
    catch(err)
    {
        return {status: 401, msg: err.message}
    }
}

module.exports = { AddProductToCart }