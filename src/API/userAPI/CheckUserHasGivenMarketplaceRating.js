let marketplaceModel = require('../../Database/marketplaceSchema')
const mongoose = require('mongoose')

async function CheckUserHasGivenMarketplaceRating(ratingAdderId, marketplaceId)
{
    let targetMarketplace = await marketplaceModel.findById({_id: marketplaceId})
    
    if(targetMarketplace.marketplaceRating.some((rateGiver) => rateGiver.ratingAdderId == ratingAdderId))
    {
        return true
    }
    else
    {
        return false
    }
}

module.exports = {CheckUserHasGivenMarketplaceRating}