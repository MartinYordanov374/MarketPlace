let review = require('../../Database/reviewSchema')
const {checkUserExistsById} = require('./checkUserExistsById')
async function addUserReview(reviewerUserId, reviewedUserId, reviewContent)
{
    // check if both users exist
    try{
        let reviewerUserExists = await checkUserExistsById(reviewerUserId)
        let reviewedUserExists = await checkUserExistsById(reviewedUserId)
        
        if(reviewedUserExists != null && reviewerUserExists != null)
        {
            // add review content and rating
            let newReview = await review({
                reviewOwner: reviewerUserExists,
                reviewContent: reviewContent,
            })

            await newReview.save()

            await reviewedUserExists.reviews.push(newReview._id)
            await reviewedUserExists.save()

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

module.exports = {addUserReview}