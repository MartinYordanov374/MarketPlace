let review = require('../../Database/reviewSchema')
const {checkUserExistsById} = require('./checkUserExistsById')
async function addUserReviews(reviewerUserId, reviewedUserId, reviewContent, reviewRating)
{
    // check if both users exist

    try{
        let reviewerUserExists = await checkUserExistsById(reviewerUserId)
        let reviewedUserExists = await checkUserExistsById(reviewedUserId)

        if(reviewedUserExists && reviewerUserExists)
        {
            // add review content and rating
            let newReview = await review({
                reviewOwner: reviewerUserExists,
                reviewContent: reviewContent,
                reviewRating: reviewRating
            })

            await newReview.save()

            console.log(reviewedUserExists)

            
        }
    }
    catch(e)
    {
        return {msg: e.message}
    }
}

module.exports = {addUserReviews}