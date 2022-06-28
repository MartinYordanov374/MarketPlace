let userModel = require('../../Database/userSchema')

const {checkUserExists} = require('./checkUserExists')


async function registerUser(username, notHashedPassword)
{
    let userExists = await checkUserExists(username)

    if(userExists){
        throw new Error('That user already exists!')
    }
    else
    {
        // TODO: FINISH THE REGISTER ENDPOINT
        console.log(`registering user`)
    }
}


module.exports = {registerUser}