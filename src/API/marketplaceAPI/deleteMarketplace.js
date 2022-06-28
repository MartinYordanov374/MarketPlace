let marketplaceModel = require('../../Database/marketplaceSchema')
const mongoose = require('mongoose')

const {getMarketplaceById} = require('./getMarketplaceByID')

async function deleteMarketplace(userID, marketplaceID){
    let targetMarketplace = await getMarketplaceById(marketplaceID)
    let targetMarketplaceOwnerID = targetMarketplace.marketplaceOwner
    console.log(targetMarketplaceOwnerID, userID)
    if(userID == targetMarketplaceOwnerID)
    {
        try{
            let deletedMarketplace = await marketplaceModel.findByIdAndDelete({_id: marketplaceID})
            await deletedMarketplace.save()
        }
        catch(e)
        {
            console.log(e)
        }
    }
    else
    {
        console.log('owner not authenticated')
    }
}

module.exports = { deleteMarketplace }