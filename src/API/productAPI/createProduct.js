let product = require('../../Database/productSchema')
const { getMarketplaceById } = require('../marketplaceAPI/getMarketplaceByID')
const {checkUserExistsById} = require('../userAPI/checkUserExistsById')
async function createProduct(creatorID, productName, productDescription, productPrice, productMarketplaceID)
{
    let CurrentUser = await checkUserExistsById(creatorID)
    let CurrentMarketplace = await getMarketplaceById(productMarketplaceID)

    console.log(CurrentMarketplace)
    let newProduct = await product({
        productName: productName,
        productDescription: productDescription,
        productPrice: productPrice,
        productCreator: CurrentUser,
        productMarketplaceID: productMarketplaceID
    })

    await newProduct.save()

    CurrentMarketplace.marketplaceProducts.push(newProduct)
    await CurrentMarketplace.save()
    // console.log(productName, productDescription, productPrice, productMarketplaceID)
}

module.exports = {createProduct}