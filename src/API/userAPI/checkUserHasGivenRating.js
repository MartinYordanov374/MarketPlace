let userModel = require('../../Database/userSchema')
const mongoose = require('mongoose')

async function CheckUserHasGivenRating(ratingAdderId, ratingReceiverId)
{
    let targetUser = await userModel.findById({_id: ratingReceiverId})
    
    if(targetUser.rating.some((rateGiver) => rateGiver.ratingAdderId == ratingAdderId))
    {
        return true
    }
    else
    {
        return false
    }
}

module.exports = {CheckUserHasGivenRating}