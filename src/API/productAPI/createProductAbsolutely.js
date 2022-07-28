let product = require('../../Database/productSchema')
const { getMarketplaceById } = require('../marketplaceAPI/getMarketplaceByID')
const {checkUserExistsById} = require('../userAPI/checkUserExistsById')
async function createProductAbsolutely(creatorID, productName, productDescription, productPrice, productImage)
{
    try{
        let CurrentUser = await checkUserExistsById(creatorID)
        

        if(CurrentUser != null)
        {
             let newProduct = await product({
                 productName: productName,
                 productDescription: productDescription,
                 productPrice: productPrice,
                 productCreator: CurrentUser._id,
                 productImage: productImage
             })
        
             await newProduct.save()
        
             CurrentUser.marketplaceProducts.push(newProduct)
             await CurrentUser.save()
    
             return {status: 200, msg: 'Product added successfully!'}
        }
        throw new Error('Invalid marketplace or user credentials!')
    }
    catch(e)
    {
        return {msg: e}
    }

}

module.exports = {createProductAbsolutely}