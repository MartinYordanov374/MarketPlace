const user = require('../../Database/userSchema')
const {checkUserExistsById} = require('../userAPI/checkUserExistsById')
const {getMarketplaceById} = require('./getMarketplaceByID')
const {CheckUserHasGivenMarketplaceRating} = require('../userAPI/CheckUserHasGivenMarketplaceRating')
const mongoose = require('mongoose')

async function addMarketplaceRating(ratingAdderId, ratingReceiverId, ratingAmount)
{

    try{
        let ratingAdder = await checkUserExistsById(ratingAdderId)
        let ratingReceiver = await getMarketplaceById(ratingReceiverId)
        let res = await CheckUserHasGivenMarketplaceRating(ratingAdderId, ratingReceiverId)

        if(res == true)
        {
            return {status: 409, message: "You have already rated this marketplace!"}
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

                await ratingReceiver.marketplaceRating.push({ratingAdderId, ratingAmount})
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
        return { status: 401, msg: e.message}
    }

}

module.exports = {addMarketplaceRating}