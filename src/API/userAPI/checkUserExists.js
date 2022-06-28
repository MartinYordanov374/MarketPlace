let userModel = require('../../Database/userSchema')
const mongoose = require('mongoose')

async function checkUserExists(username)
{
    let userExists = await userModel.findOne({username})
    if(userExists == null)
    {
        return false
    }
    else{
        return true
    }
}


module.exports = {checkUserExists}