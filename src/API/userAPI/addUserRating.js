const user = require('../../Database/userSchema')
const {checkUserExistsById} = require('./checkUserExistsById')

async function addUserRating(ratingAdderId, ratingReceiverId, ratingAmount)
{
    // check if both users exist
        // Add a rating between 1 and 5
    // throw an exception if any of the two, does not exist
    try{
        let ratingAdder = await checkUserExistsById(ratingAdderId)
        let ratingReceiver = await checkUserExistsById(ratingReceiverId)
    
        if(ratingAdder != null && ratingReceiver != null)
        {
            if(ratingAmount < 1)
            {
                ratingAmount = 1
            }
            else if(ratingAmount > 5)
            {
                ratingAmount = 5
            }

            await ratingReceiver.rating.push(ratingAmount)
            await ratingReceiver.save()

            return {status: 200, msg: 'Rating successfully added'}
        }
        else
        {
            throw new Error('Either or both of the users provided does not exist.')
        }
    }
    catch(e)
    {
        return { status: 401, msg: e.message}
    }

}

module.exports = {addUserRating}