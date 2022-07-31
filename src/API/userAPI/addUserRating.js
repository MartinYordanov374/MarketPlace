const user = require('../../Database/userSchema')
const {checkUserExistsById} = require('./checkUserExistsById')
const {CheckUserHasGivenRating} = require('./checkUserHasGivenRating')
const mongoose = require('mongoose')

async function addUserRating(ratingAdderId, ratingReceiverId, ratingAmount)
{
    console.log(ratingAmount)
    try{

        let ratingAdder = await checkUserExistsById(ratingAdderId)
        let ratingReceiver = await checkUserExistsById(ratingReceiverId)
        let res = await CheckUserHasGivenRating(ratingAdderId, ratingReceiverId)
        if(res == true)
        {
            return {status: 409, message: "You have already rated that user!"}
        }
        else
        {         
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
                ratingAdderId = mongoose.Types.ObjectId(ratingAdderId)
                await ratingReceiver.rating.push({ratingAdderId, ratingAmount})
                await ratingReceiver.save()

                return {status: 200, msg: 'Rating successfully added'}
            }
            else
            {
                throw new Error('Either or both of the users provided does not exist.')
            }
        }
    }
    catch(e)
    {
        console.log(e)
        return { status: 401, msg: e.message}
    }

}

module.exports = {addUserRating}