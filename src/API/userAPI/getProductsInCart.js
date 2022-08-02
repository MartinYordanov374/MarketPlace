let userModel = require('../../Database/userSchema')
let productModel = require('../../Database/productSchema')

const mongoose = require('mongoose')

async function getProductsInCard( userID )
{

    try{
        
        // TODO HANDLE THE CASE WHERE THE USER OR THE PRODUCT DO NOT EXIST
        let targetUser = await userModel.findById({_id: userID}).populate('productsInCart')
    
        return {status: 200, data: targetUser.productsInCart}
    }
    catch(err)
    {
        return {status: 401, msg: err.message}
    }
}

module.exports = { getProductsInCard }