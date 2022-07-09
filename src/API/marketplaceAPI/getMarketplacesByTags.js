let marketplace = require('../../Database/marketplaceSchema')

async function getMarketplacesByTags(tags)
{
    let result = marketplace.find({
            marketplaceTags: { $in: tags }
        })
    return result
}

module.exports = {
    getMarketplacesByTags
}