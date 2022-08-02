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
            if(targetReview.positiveRatings.includes(targetUserID))
            {
                targetReview.positiveRatings = targetReview.positiveRatings.filter((positiveFeedbackUserIDS) => positiveFeedbackUserIDS != targetUserID)
                await targetReview.save()
                return {status: 200}
            }
            else
            {
                targetReview.positiveRatings.push(targetUserID)
                await targetReview.save()
                return {status: 200}
            }

        
        }

        return {status: 200}
    }
    catch(err)
    {
        return {msg: err}
    }
    
}



module.exports = { marketplaceHelpful }