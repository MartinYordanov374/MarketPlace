let userModel = require('../../Database/userSchema')
const mongoose = require('mongoose')

async function ClearCart ( userID )
{
    let targetUser = await userModel.findById({_id: userID})
    targetUser.productsInCart = []
    await targetUser.save()

    return {status: 200, msg: 'Cart Cleared Successfully!'}
}


module.exports = {ClearCart}