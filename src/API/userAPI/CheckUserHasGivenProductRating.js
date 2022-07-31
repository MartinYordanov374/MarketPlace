let productModel = require('../../Database/productSchema')
const mongoose = require('mongoose')

async function CheckUserHasGivenProductRating(ratingAdderId, productId)
{
    let targetProduct = await productModel.findById({_id: productId})
    
    if(targetProduct.productRating.some((rateGiver) => rateGiver.ratingAdderId == ratingAdderId))
    {
        return true
    }
    else
    {
        return false
    }
}

module.exports = {CheckUserHasGivenProductRating}