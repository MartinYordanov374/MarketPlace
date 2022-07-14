let marketplaceModel = require('../../Database/marketplaceSchema')
const {checkUserExists} = require('../userAPI/checkUserExists')
const { checkUserExistsById } = require('../userAPI/checkUserExistsById')

async function createMarketplace(marketplaceOwnerID, marketplaceDescription, marketplaceTags, marketplaceName, marketplaceImage){
    
    try{
        let targetUser = await checkUserExistsById(marketplaceOwnerID)

        if(targetUser)
        {
            let userID = targetUser._id
            let newMarketplace = await marketplaceModel({
                marketplaceOwner: userID,
                marketplaceDescription: marketplaceDescription,
                marketplaceName: marketplaceName,
                marketplaceTags: marketplaceTags,
                marketplaceImage: marketplaceImage
            })
        
            await newMarketplace.save()
    
            await targetUser.marketplaces.push(newMarketplace._id)
            await targetUser.save()
    
            return {status: 200, msg: 'Marketplace created successfully'}
        }
        else
        {
            throw new Error('Invalid User Credentials.')
        }
    }
    catch(e)
    {
        return {status: 402, msg: e}
    }


}

module.exports = {
    createMarketplace
}