let review = require('../../Database/reviewSchema')
const {checkUserExistsById} = require('./checkUserExistsById')
const {getMarketplaceByID} = require('./getMarketplaceByID')

async function addMarketplaceReview(reviewerUserId, reviewedMarketplaceID, reviewContent)
{
    // check if both users exist
    try{
        let reviewerUserExists = await checkUserExistsById(reviewerUserId)
        let reviewedMarketplaceExists = await getMarketplaceByID(reviewedMarketplaceID)
        
        if(reviewedMarketplaceExists != null && reviewerUserExists != null)
        {
            // add review content and rating
            let newReview = await review({
                reviewOwner: reviewerUserExists,
                reviewContent: reviewContent,
            })

            await newReview.save()

            await reviewedMarketplaceExists.reviews.push(newReview._id)
            await reviewedMarketplaceExists.save()

            return {status: 200, msg: 'Review added successfully!'}
            
        }
        else
        {
            throw new Error('It seems that one of the users does not exist, could there be a mistake?')
        }
    }
    catch(e)
    {
        return {status: 401, msg: e.message}
    }
}

module.exports = {addMarketplaceReview}