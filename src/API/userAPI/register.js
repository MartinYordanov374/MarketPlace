let userModel = require('../../Database/userSchema')

const {checkUserExists} = require('./checkUserExists')

let bcrypt = require('bcrypt')
const saltRounds = 9

async function registerUser(username, notHashedPassword, confirmationPassword)
{
    let userExists = await checkUserExists(username)

    if(notHashedPassword == confirmationPassword)
    {
        try{
            if(userExists){
                throw new Error('That user already exists!')
            }
            else
            {
                let hashedPass =  await bcrypt.hash(notHashedPassword.toString(), saltRounds)
                let user = await userModel({
                    username: username,
                    hashedPass: hashedPass,
                    rating: 0
                })
        
                let userData = await user.save()
                return {msg: 'Registration successful', status: 200, userData: userData}
            }
        }
        catch(e)
        {
            return {msg: e, status: 401}
        }
    }
    else if(username == notHashedPassword || confirmationPassword == username)
    {
        throw new Error('Password cannot be the same as the username!')
    }
    else
    {
        throw new Error('Passwords do not match!')
    }

}


module.exports = {registerUser}