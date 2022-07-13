let reviewModel = require('../../Database/reviewSchema')

async function getReviewById(reviewID)
{
    try{
        let targetReview = reviewModel.findById({_id: reviewID})
        return targetReview
    }
    catch(err)
    {
        return {msg: err}
    }
}

module.exports = { getReviewById }