const {checkUserExistsById} = require('../userAPI/checkUserExistsById')
const {findProductById} = require('./findProductById')
let review = require('../../Database/reviewSchema')

async function addProductReview(reviewerUserId, reviewedProductId, reviewContent)
{
    console.log(reviewerUserId, reviewedProductId, reviewContent)
    // check if both users exist
    try{
        let reviewerUserExists = await checkUserExistsById(reviewerUserId)
        let reviewedProductExists = await findProductById(reviewedProductId)
        
        if(reviewedProductExists != null && reviewerUserExists != null)
        {
            // add review content and rating
            let newReview = await review({
                reviewOwner: reviewerUserExists,
                reviewContent: reviewContent,
            })

            await newReview.save()

            await reviewedProductExists.productReviews.push(newReview._id)
            await reviewedProductExists.save()

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

module.exports = {
    addProductReview
}