import {checkUserExistsById} from '../userAPI/checkUserExistsById'
import {getMarketplaceByID} from '../marketplaceAPI/getMarketplaceByID'

async function marketplaceNotHelpful(reviewerID, marketplaceID)
{
    let targetUserID = reviewerID
    let targetMarketplaceID = marketplaceID

    try{
        let targetUser = await checkUserExistsById(targetUserID)
        let targetMarketplace = await getMarketplaceByID(targetMarketplaceID)
    
        if(targetUser != undefined && targetMarketplace != undefined)
        {
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