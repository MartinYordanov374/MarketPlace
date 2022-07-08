let marketplaceModel = require('../../Database/marketplaceSchema')

async function getAllMarketplaces(){
    try{
        let AllMarketplaces = await marketplaceModel.find()
        return AllMarketplaces
    }
    catch(e){
        return e 
    }
    
}

module.exports = {getAllMarketplaces}