let marketplaceModel = require('../../Database/marketplaceSchema')
const {checkUserExists} = require('../userAPI/checkUserExists')

async function createMarketplace(ownerUsername){
    let targetUser = checkUserExists(ownerUsername)
    console.log(targetUser)
}

module.exports = {
    createMarketplace
}