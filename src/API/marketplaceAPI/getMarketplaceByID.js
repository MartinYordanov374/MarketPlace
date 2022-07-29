let marketplaceModel = require('../../Database/marketplaceSchema')

async function getMarketplaceById(marketplaceID){
    try{
        let targetMarketplace = await marketplaceModel.findById({_id: marketplaceID}).populate('marketplaceProducts')
        .populate('marketplaceOwner')
        .populate('marketplaceProducts')
        .populate({ path : 'marketplaceReviews', 
        populate: {
            path: 'reviewOwner'
        }})
        return targetMarketplace
    }
    catch(e){
        return e 
    }
    
}

module.exports = {getMarketplaceById}