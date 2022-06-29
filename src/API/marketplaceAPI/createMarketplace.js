let marketplaceModel = require('../../Database/marketplaceSchema')
const {checkUserExists} = require('../userAPI/checkUserExists')
const { checkUserExistsById } = require('../userAPI/checkUserExistsById')

async function createMarketplace(marketplaceOwnerID, marketplaceDescription, marketplaceTags, marketplaceName){
    
    try{
        let targetUser = await checkUserExistsById(marketplaceOwnerID)
        let userID = targetUser._id
        let newMarketplace = await marketplaceModel({
            marketplaceOwner: userID,
            marketplaceDescription: marketplaceDescription,
            marketplaceName: marketplaceName,
            marketplaceTags: marketplaceTags
        })
    
        await newMarketplace.save()

        await targetUser.marketplaces.push(newMarketplace._id)
        await targetUser.save()

        return {status: 200, msg: 'Marketplace created successfully'}
    }
    catch(e)
    {
        return {status: 402, msg: e}
    }


}

module.exports = {
    createMarketplace
}