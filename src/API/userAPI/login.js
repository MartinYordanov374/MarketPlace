let bcrypt = require('bcrypt')
const { checkUserExists } = require('./checkUserExists')

const saltRounds = 9

async function loginUser(username, notHashedPassword)
{
    let exists = await checkUserExists(username)
    
    if(exists != null)
    {
        try{

            let hashedPasswordsMatch = await bcrypt.compare(notHashedPassword.toString(), exists.hashedPass)
            if(hashedPasswordsMatch)
            {
                
                return { status: 200 }
            }
            else
            {
                return { status: 401 }
            }
        }
        catch(e)
        {
            return { status: 404 }
        }
    }
    else
    {
        return { status: 404 }
    }
}

module.exports = {
    loginUser
}