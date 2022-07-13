let checkUserExistsById = require('../userAPI/checkUserExistsById')
let getMarketplaceByID = require('../marketplaceAPI/getMarketplaceByID')

async function marketplaceHelpful(reviewerID, marketplaceID)
{
    let targetUserID = reviewerID
    let targetMarketplaceID = marketplaceID

    try{
        let targetUser = await checkUserExistsById(targetUserID)
        let targetMarketplace = await getMarketplaceByID(targetMarketplaceID)
    
        if(targetUser != undefined && targetMarketplace != undefined)
        {

            // TODO : ADD CHECK IF THE USER HAS LIKED  BEFORE OR NOT
            targetMarketplace.positiveRatings.push(targetUserID)
            await targetMarketplace.save()
        }

        return {status: 200}
    }
    catch(err)
    {
        return {msg: err}
    }
    
}



module.exports = { marketplaceHelpful }