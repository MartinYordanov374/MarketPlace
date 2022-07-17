let userModel = require('../../Database/userSchema')

async function updateProfilePicture(targetID, pfpObject)
{
    let targetUser = await userModel.findById(targetID)
    targetUser.profilePicture = pfpObject.data
    await targetUser.save()
}

module.exports = { updateProfilePicture }