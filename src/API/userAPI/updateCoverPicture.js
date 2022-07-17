let userModel = require('../../Database/userSchema')

async function updateCoverPicture(targetID, coverPictureObject)
{
    let targetUser = await userModel.findById(targetID)
    targetUser.covertPicture = coverPictureObject.data
    await targetUser.save()
}

module.exports = { updateCoverPicture }