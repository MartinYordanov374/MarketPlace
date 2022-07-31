const {checkUserExistsById} = require('../userAPI/checkUserExistsById')
const {findProductById} = require('./findProductById')
const {CheckUserHasGivenProductRating} = require('../userAPI/CheckUserHasGivenProductRating')
async function addProductRating(ratingAdderId, ratingReceiverId, ratingAmount)
{
    console.log(ratingAmount)
    try{
        let ratingAdder = await checkUserExistsById(ratingAdderId)
        let ratingReceiver = await findProductById(ratingReceiverId)

        let res = await CheckUserHasGivenProductRating(ratingAdderId, ratingReceiverId)

        if(res == true)
        {
            return {status: 409, message: "You have already rated that product!"}
        }
        else
        {     
        
            if(ratingAdder != null && ratingReceiver != null)
            {
                if(ratingAmount < 1)
                {
                    ratingAmount = 1
                }
                else if(ratingAmount > 5)
                {
                    ratingAmount = 5
                }

                await ratingReceiver.productRating.push({ratingAdderId, ratingAmount})
                await ratingReceiver.save()

                return {status: 200, msg: 'Rating successfully added'}
            }
            else
            {
                throw new Error('Either or both of the users provided does not exist.')
            }
        }
    }
    catch(e)
    {
        return { status: 401, msg: e.message}
    }

}

module.exports = {addProductRating}