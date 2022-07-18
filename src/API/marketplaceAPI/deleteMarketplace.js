let marketplaceModel = require('../../Database/marketplaceSchema')
const mongoose = require('mongoose')

const {getMarketplaceById} = require('./getMarketplaceByID')

async function deleteMarketplace(userID, marketplaceID){
    let targetMarketplace = await getMarketplaceById(marketplaceID)
    let targetMarketplaceOwnerID = targetMarketplace.marketplaceOwner

    if(mongoose.Types.ObjectId(userID).equals(mongoose.Types.ObjectId(targetMarketplaceOwnerID)))
    {
         try{
             let deletedMarketplace = await marketplaceModel.findByIdAndDelete( marketplaceID )
             return {status: 200, msg: 'Marketplace Deleted Successfully'}
         }
         catch(e)
         {
             return {msg: 'Something went wrong'}
         }
     }
     else
     {
         return {status: 403, msg: 'You\'re not allowed to do that !'}
     }
}

module.exports = { deleteMarketplace }