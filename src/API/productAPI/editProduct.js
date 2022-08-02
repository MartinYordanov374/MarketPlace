let productModel = require('../../Database/productSchema')
const { findProductById } = require('../productAPI/findProductById')
const { checkUserExistsById } = require('../userAPI/checkUserExistsById')

async function EditProduct(editorID, productId, newProductName, newProductDescription, newProductPrice)
{
    try{
        let user = await checkUserExistsById(editorID)
        let product = await findProductById(productId)
        let productOwnerID = product.productCreator
        let userID = user._id

        if(productOwnerID.equals(userID))
        {
            product.productName = newProductName
            product.productDescription = newProductDescription
            product.productPrice = newProductPrice

            await product.save()
            return {status: 200, msg: 'Product successfully updated'}
        }
        else
        {
            throw new Error('You cannot do this action.')
        }
    }
    catch(err)
    {
        return { status: 401, msg: err}
    }



    // check if the user is the owner of the product
        //  --  If true 
            // successfully update the product
        //  -- If false
            // throw an exception saying that the user does nto have the right to do that operation
}

module.exports = { EditProduct }