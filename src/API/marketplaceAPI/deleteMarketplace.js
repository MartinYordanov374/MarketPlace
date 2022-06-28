let marketplaceModel = require('../../Database/marketplaceSchema')

const {getMarketplaceById} = require('./getMarketplaceByID')

async function deleteMarketplace(userID, marketplaceID){
    let targetMarketplace = await getMarketplaceById(marketplaceID)
    console.log(targetMarketplace)
}

module.exports = { deleteMarketplace }