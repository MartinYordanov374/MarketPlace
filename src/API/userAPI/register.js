let userModel = require('../../Database/userSchema')

const {checkUserExists} = require('./checkUserExists')

let bcrypt = require('bcrypt')
const saltRounds = 9

async function registerUser(username, notHashedPassword, confirmationPassword)
{
    let userExists = await checkUserExists(username)

    if(notHashedPassword.length >= 6)
    {
        if(notHashedPassword == confirmationPassword)
        {
            try
            {
                if(userExists)
                {
                    throw new Error('That user already exists!')
                }
                if(username == notHashedPassword || username == confirmationPassword)
                {
                    return { msg:'Password cannot be the same as the username!', status: 401 }
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
        else
        {
            return { msg:'Passwords do not match!', status: 401 }
        }
    }
    else
    {
        return {msg: 'Your password must be at least 6 symbols!', status: 401}
    }
}


module.exports = {registerUser}