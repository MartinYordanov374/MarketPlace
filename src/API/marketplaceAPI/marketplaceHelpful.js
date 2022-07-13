let {checkUserExistsById} = require('../userAPI/checkUserExistsById')
let {getMarketplaceById} = require('./getMarketplaceByID')
const { getReviewById } = require('./getReviewById')

async function marketplaceHelpful(reviewerID, marketplaceID,reviewID)
{
    let targetUserID = reviewerID
    let targetMarketplaceID = marketplaceID
    let targetReviewID = reviewID

    try{
        let targetUser = await checkUserExistsById(targetUserID)
        let targetMarketplace = await getMarketplaceById(targetMarketplaceID)
        let targetReview = await getReviewById(targetReviewID)

    
        if(targetUser != undefined && targetMarketplace != undefined)
        {
            // TODO : ADD CHECK IF THE USER HAS DISLIKED  BEFORE OR NOT
            targetReview.positiveRatings.push(targetUserID)
            await targetReview.save()
        }

        return {status: 200}
    }
    catch(err)
    {
        return {msg: err}
    }
    
}



module.exports = { marketplaceHelpful }