let {checkUserExistsById} = require('../userAPI/checkUserExistsById')
let {getMarketplaceById} = require('./getMarketplaceByID')
const { getReviewById } = require('./getReviewById')

async function marketplaceNotHelpful(reviewerID, marketplaceID, reviewID)
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
            if(targetReview.negativeRatings.includes(targetUserID))
            {
                targetReview.negativeRatings = targetReview.negativeRatings.filter((negativeFeedbackUserIDS) => negativeFeedbackUserIDS != targetUserID)
                await targetReview.save()
                return {status: 200}
            }
            else
            {
                targetReview.negativeRatings.push(targetUserID)
                await targetReview.save()

                return {status: 200}
            }
        }

    }
    catch(err)
    {
        return {msg: err}
    }
    
}



module.exports = { marketplaceNotHelpful }

