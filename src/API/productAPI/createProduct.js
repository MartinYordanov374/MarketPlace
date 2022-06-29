let product = require('../../Database/productSchema')
const { getMarketplaceById } = require('../marketplaceAPI/getMarketplaceByID')
const {checkUserExistsById} = require('../userAPI/checkUserExistsById')
async function createProduct(creatorID, productName, productDescription, productPrice, productMarketplaceID)
{
    try{
        let CurrentUser = await checkUserExistsById(creatorID)
        let CurrentMarketplace = await getMarketplaceById(productMarketplaceID)
        

        if(CurrentUser != null && CurrentMarketplace != null)
        {
             let newProduct = await product({
                 productName: productName,
                 productDescription: productDescription,
                 productPrice: productPrice,
                 productCreator: CurrentUser._id,
                 productMarketplaceID: productMarketplaceID
             })
        
             await newProduct.save()
        
             CurrentMarketplace.marketplaceProducts.push(newProduct)
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