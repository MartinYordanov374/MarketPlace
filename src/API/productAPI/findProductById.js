let product = require('../../Database/productSchema')

async function findProductById(productId)
{
    try{
        let targetProduct = await product.findById({_id: productId})
        .populate('productReviews')
        .populate(
            {path : 'productReviews',
            populate: {
                path: 'reviewOwner'
            }})

        return targetProduct
    }
    catch(e)
    {
        return {msg: e}
    }
}

module.exports = { findProductById }