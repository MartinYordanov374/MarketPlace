let userModel = require('../../Database/userSchema')
const mongoose = require('mongoose')

async function checkUserExistsById(userID)
{
    let userExists = await userModel.findOne({userID})
    if(userExists == null)
    {
        return false
    }
    else{
        return userExists
    }
}


module.exports = {checkUserExistsById}