let userModel = require('../../Database/userSchema')
let productModel = require('../../Database/productSchema')

const mongoose = require('mongoose')

async function RemoveProductFromCart( userID, productID )
{

    try{
        
        // TODO HANDLE THE CASE WHERE THE USER OR THE PRODUCT DO NOT EXIST
        let targetUser = await userModel.findById({_id: userID}).populate('productsInCart')

        targetUser.productsInCart = targetUser.productsInCart.filter((product) => product._id != productID)


        await targetUser.save()

        return {status: 200, msg: 'Successfully removed product from cart!'}
    }
    catch(err)
    {
        return {status: 401, msg: err.message}
    }
}

module.exports = { RemoveProductFromCart }