let {checkUserExistsById} = require('../userAPI/checkUserExistsById')
let {getMarketplaceById} = require('./getMarketplaceByID')

async function marketplaceNotHelpful(reviewerID, marketplaceID)
{
    let targetUserID = reviewerID
    let targetMarketplaceID = marketplaceID
    try{
        let targetUser = await checkUserExistsById(targetUserID)
        let targetMarketplace = await getMarketplaceById(targetMarketplaceID)
    
        console.log(targetMarketplace)
        if(targetUser != undefined && targetMarketplace != undefined)
        {
            // TODO : ADD CHECK IF THE USER HAS DISLIKED  BEFORE OR NOT
            targetMarketplace.negativeRatings.push(targetUserID)
            await targetMarketplace.save()
        }

        return {status: 200}
    }
    catch(err)
    {
        return {msg: err}
    }
    
}



module.exports = { marketplaceNotHelpful }