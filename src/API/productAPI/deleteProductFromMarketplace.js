let product = require('../../Database/productSchema')

const {checkUserExistsById} = require('../userAPI/checkUserExistsById')
const {getMarketplaceById} = require('../marketplaceAPI/getMarketplaceByID')
const {findProductById} = require('./findProductById')


async function deleteProduct(userID, marketplaceID, productID)
{
    try
    {
        // TODO Add check if product exists !
        let targetUser = await checkUserExistsById(userID)
        let targetMarketplace = await getMarketplaceById(marketplaceID)
        let targetProduct = await findProductById(productID)
    
        let isUserMarketplaceOwner = targetMarketplace.marketplaceOwner.equals(targetUser._id)
    
        if(isUserMarketplaceOwner)
        {
            let result = await actuallyDeleteProduct(targetMarketplace, productID)
            return {msg: result.msg.message}
        }
        else
        {
            let isUserProductOwner = targetProduct.productCreator.equals(targetUser._id)
            
            if(isUserProductOwner)
            {
                let result = await actuallyDeleteProduct(targetMarketplace, productID)
                return {msg: result.msg.message}
            }
            else
            {
                return {status: 401, msg: 'You don\'t have a permission to do that !'}
            }
        }
    }
    catch(e)
    {
        return {msg: e}
    }
}

async function actuallyDeleteProduct(targetMarketplace, productID)
{
    let productsInMarketplace = targetMarketplace.marketplaceProducts
    let productIndexInMarketplace = productsInMarketplace.indexOf(productID)

    try{
        if(productIndexInMarketplace != -1)
        {
            productsInMarketplace.splice(productIndexInMarketplace,1)
        
            await targetMarketplace.save()
        
            return {status: 200, msg: 'Product deleted successfully!!!'}
        }
        else
        {
            throw new Error('This product does not exist !')
        }
    }
    catch(e)
    {
        return {msg: e}
    }

    
}
module.exports = {deleteProduct}