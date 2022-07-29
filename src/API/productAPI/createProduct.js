let productModel = require('../../Database/productSchema')
const { getMarketplaceById } = require('../marketplaceAPI/getMarketplaceByID')
const {checkUserExistsById} = require('../userAPI/checkUserExistsById')
async function createProduct(creatorID, productId, productMarketplaceID)
{
    try{
        let CurrentUser = await checkUserExistsById(creatorID)
        let CurrentMarketplace = await getMarketplaceById(productMarketplaceID)
        

        if(CurrentUser != null && CurrentMarketplace != null)
        {
             let product = await productModel.findById({_id: productId})
        
        
             CurrentMarketplace.marketplaceProducts.push(product)
             await CurrentMarketplace.save()
    
             return {status: 200, msg: 'Product added successfully!'}
        }
        throw new Error('Invalid marketplace or user credentials!')
    }
    catch(e)
    {
        return {msg: e}
    }

}

module.exports = {createProduct}