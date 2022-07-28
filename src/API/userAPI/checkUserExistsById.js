let userModel = require('../../Database/userSchema')
const mongoose = require('mongoose')

async function checkUserExistsById(userID)
{
    let userExists = await userModel.findById({_id: userID}).populate('marketplaces').populate('products')
    console.log(userExists)
    if(userExists == null)
    {
        return false
    }
    else{
        return userExists
    }
}


module.exports = {checkUserExistsById}