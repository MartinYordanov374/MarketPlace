// check if user is owner of the product
// if it is - remove the product from the database
// if it is not - throw an error

const {findProductById} = require('./findProductById')
const {checkUserExistsById} = require('../userAPI/checkUserExistsById')
const product = require('../../Database/productSchema')

async function deleteProductAbsolutely(userID, productID)
{
    try{
        // TODO Add checks for the product's existence and if it doesn't exist, throw an exception
        let targetUser = await checkUserExistsById(userID)
        let targetProduct = await findProductById(productID)
        
        if(targetProduct != null)
        {
            let isUserProductCreator = targetUser._id.equals(targetProduct.productCreator)
        
            if(isUserProductCreator)
            {
                await product.findByIdAndDelete({_id: productID})
                return {msg: 'Product deleted successfully'}
            }
            else
            {
                throw new Error(`You don't have permissions to do that !`)
            }
        }
        else
        {
            throw new Error('The specified product does not exist !')
        }
    }
    catch(e)
    {
        return {msg: e.message}
    }

}

module.exports = {
    deleteProductAbsolutely
}