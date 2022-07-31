const express = require('express')
const cors = require('cors')

const databaseConfig = require('../Database/mongoose')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')

const {registerUser} = require('../API/userAPI/register')
const {loginUser} = require('../API/userAPI/login')

const {createMarketplace} = require('../API/marketplaceAPI/createMarketplace')
const {deleteMarketplace} = require('../API/marketplaceAPI/deleteMarketplace')
const {createProduct} = require('../API/productAPI/createProduct')
const {findProductById} = require('../API/productAPI/findProductById')
const {createProductAbsolutely} = require('../API/productAPI/createProductAbsolutely')
const {deleteProduct} = require('../API/productAPI/deleteProductFromMarketplace')
const { deleteProductAbsolutely } = require('../API/productAPI/deleteProductAbsolutely')
const { addUserReview } = require('../API/userAPI/addUserReview')
const { addUserRating } = require('../API/userAPI/addUserRating')
const { addMarketplaceReview } = require('../API/marketplaceAPI/addMarketplaceReview')
const { addMarketplaceRating } = require('../API/marketplaceAPI/addMarketplaceRating')
const { getAllMarketplaces } = require('../API/marketplaceAPI/getAllMarketplaces')
const { addProductRating } = require('../API/productAPI/addProductRating')
const { addProductReview } = require('../API/productAPI/addProductReview')

let cookieParser = require('cookie-parser');
let session = require('express-session');
const { checkUserExistsById } = require('../API/userAPI/checkUserExistsById')
const { getMarketplacesByTags } = require('../API/marketplaceAPI/getMarketplacesByTags')
const { getMarketplaceById } = require('../API/marketplaceAPI/getMarketplaceByID')

const {marketplaceHelpful} = require('../API/marketplaceAPI/marketplaceHelpful')
const {marketplaceNotHelpful} = require('../API/marketplaceAPI/marketplaceNotHelpful')
const { updateProfilePicture } = require('../API/userAPI/updateProfilePicture')
const { updateCoverPicture } = require('../API/userAPI/updateCoverPicture')

const mongoDB_Session = require('connect-mongodb-session')(session)
const multer = require('multer')
const fs = require('fs')
const path = require('path')


const storage = multer.diskStorage({
    destination: function(req, file, cb)
    {
        cb(null,'./uploads')
    },
    filename: function(req,file,cb)
    {
        cb(null, file.fieldname)
    }
})

var upload = multer({storage: storage});

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
};

async function startServer(){
    //#region configurations
    const app = express()
    
    const store = new mongoDB_Session({
        uri: 'mongodb://localhost:27017/marketplaceDB',
        collection: 'sessions',
    })
    
    app.use(cookieParser('secret'))
    app.use(session({
        secret: 'secret',
        store: store,
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: false,
            secure: false,
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
            path: '/'
            },
        }))

    app.use(cors(corsOptions))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    await databaseConfig(app)

    //#endregion
    

    app.post('/register', async (req,res) => {
        let incomingData = req.body
        let username = incomingData.username
        let notHashedPassword = incomingData.password
        let confirmationPassword = incomingData.repass

        let registerResult = await registerUser(username, notHashedPassword, confirmationPassword)

        
        if(registerResult.status == 401)
        {
            res.status(401).send(registerResult.msg.toString())
        }
        else {
            res.status(200).send(registerResult.msg.toString())
        }
    })

    app.post('/login', async (req,res) => {
        let incomingData = req.body
        let username = incomingData.username
        let notHashedPassword = incomingData.password

        let loginResult = await loginUser(username, notHashedPassword)

        if(loginResult.status == 200)
        {
            req.session.user = {username: username, id: loginResult.userData._id} 
            req.session.save(() => {
                
            })
            // res.send(req.sessionID)
            res.status(200).send({msg: 'Login successful!', status: 200})

        }
        else if(loginResult.status == 401)
        {
            res.status(401).send('Wrong password')
        }
        else{
            res.status(404).send('That user doesn\'t exist')
        }


        
    })
    
    app.post('/createMarketplace', upload.single('marketplaceImage'), async(req,res) => {

        let incomingData = req.body
        let userID = incomingData.userID
        let description = incomingData.marketplaceDescription
        try{
            let marketplaceImage = {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/jpg'
            }
            let marketplaceTags = incomingData.marketplaceTags
            let marketplaceTagsSplitted = marketplaceTags.split(', ')
            marketplaceTagsSplitted = marketplaceTagsSplitted.join(' ')
            marketplaceTagsSplitted = marketplaceTagsSplitted.split(' ')
            marketplaceTagsSplitted = marketplaceTagsSplitted.map((tag) => tag.toLowerCase())
            let marketplaceName = incomingData.marketplaceName

            try{
                if(checkUserExistsById(userID) != false)
                {
                    if(description == '' || description.length < 10)
                    {
                        throw new Error('Your marketplace description must be at least 10 symbols!')
                    }
                    if(marketplaceTagsSplitted.length < 1)
                    {
                        throw new Error('You must assign at least 1 tag to your marketplace!')
                    }
                    if(marketplaceName == '' || marketplaceName < 3)
                    {
                        throw new Error('Your marketplace name is too short. It must be at least 3 symbols!')
                    }
                    else
                    {
                        let result = await createMarketplace(userID,description, marketplaceTagsSplitted, marketplaceName, marketplaceImage)

                        if(result.status == 200)
                        {
                            res.status(200).send(result.msg)
                        }
                        else
                        {
                            res.status(402).send(result.msg)
                        }
    
                    }
                }
                else
                {
                    throw new Error('The user trying to create the marketplace does not exist!')
                }
            }
            catch(err)
            {
                res.status(402).send({ msg: err.message })
            }
        }
        catch(err)
        {
            console.log(err)
        }
    })

    app.post('/deleteMarketplace', async(req,res)=>{
        let userID = req.body.userID
        let marketplaceID = req.body.marketplaceID
        let result = await deleteMarketplace(userID, marketplaceID)

        if(result.status == 200)
        {
            res.status(200).send(result.msg)
        }
        else if (result.status == 403)
        {
            res.status(403).send(result.msg)
        }
        else
        {
            res.send(result.msg)
        }
    })

    app.post('/createProductAbsolutely', upload.single('productImage'), async(req,res) => {
        let incomingData = req.body
        let creatorID = incomingData.creatorID
        let productName = incomingData.productName  
        let productDescription = incomingData.productDescription
        let productPrice = incomingData.productPrice
        let productImage = {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/jpg'
        }
        
        let result = await createProductAbsolutely(creatorID,productName,productDescription,productPrice, productImage)
        console.log(result)
        if(result.status == 200)
        {
            res.status(200).send(result.msg)
        }
        else
        {
            res.status(401).send(result.msg)
        }
    })

    app.post('/createProduct', async(req,res) => {
        let incomingData = req.body
        let creatorId = incomingData.productCreatorID
        let productId = incomingData.productId
        let marketplaceId = incomingData.marketplaceId
        let result = await createProduct(creatorId, productId, marketplaceId)
        if(result.status == 401)
        {
            res.status(401).send(result.msg)
        }
        else if(result.status == 200)
        {
            res.status(200).send(result.msg)
        }
    })

    app.post('/deleteProductFromMarketplace', async(req,res) => {
        let userID = req.body.userID
        let marketplaceID = req.body.marketplaceID
        let productID = req.body.productID

        let result = await deleteProduct(userID, marketplaceID, productID)
        res.send(result.msg)
    })

    app.post('/deleteProductAbsolutely', async(req,res) => {
        let userID = req.body.userID
        let productID = req.body.productID

        let result = await deleteProductAbsolutely(userID, productID)
        res.send(result.msg)
    })

    app.post('/addUserReview', async(req,res) => {
        let incomingData = req.body
        let reviewerUserId = incomingData.reviewerUserId
        let reviewedUserId = incomingData.reviewedUserId
        let reviewContent = incomingData.reviewContent

        let result = await addUserReview(reviewerUserId, reviewedUserId,reviewContent)
        if(result.status == 200)
        {
            res.status(200).send(result.msg)
        }
        else
        {
            res.status(401).send(result.msg)
        }

    })

    app.post('/addUserRating', async(req,res) => {
        let incomingData = req.body
        let ratingAdderId = incomingData.ratingAdderId
        let ratingReceiverId = incomingData.ratingReceiverId
        let ratingAmount = incomingData.ratingAmount

        let result = await addUserRating(ratingAdderId, ratingReceiverId, ratingAmount)

        if(result.status == 200)
        {
            res.status(200).send(result.msg)
        }
        else if(result.status == 409)
        {
            res.status(409).send(result.message) 
        }
        else if(result.status == 401)
        {
            res.status(401).send(result.msg.message)
        }
    })

    app.post('/addMarketplaceReview', async(req,res) => {
        let incomingData = req.body
        let reviewerUserId = incomingData.reviewerUserId
        let reviewedMarketplaceId = incomingData.reviewedMarketplaceId
        let reviewContent = incomingData.reviewContent

        
        let result = await addMarketplaceReview(reviewerUserId, reviewedMarketplaceId,reviewContent)
        if(result.status == 200)
        {
            res.status(200).send(result.msg)
        }
        else
        {
            res.status(401).send(result.msg)
        }
    })
    
    app.post('/addMarketplaceRating', async(req,res) => {
        let incomingData = req.body
        let ratingAdderId = incomingData.ratingAdderId
        let ratingReceiverId = incomingData.ratingReceiverId
        let ratingAmount = incomingData.ratingAmount

        let result = await addMarketplaceRating(ratingAdderId, ratingReceiverId,ratingAmount)

        if(result.status == 200)
        {
            res.status(200).send(result.msg)
        }
        else{
            res.status(401).send('Something went wrong.')
        }
    })

    app.post('/addProductRating', async(req,res) => {
        let incomingData = req.body
        let ratingAdderId = incomingData.ratingAdderId
        let ratingReceiverId = incomingData.ratingReceiverId
        let ratingAmount = incomingData.ratingAmount

        let result = await addProductRating(ratingAdderId, ratingReceiverId, ratingAmount)
        if(result.status == 200)
        {
            res.status(200).send(result.msg)
        }
        else if(result.status == 409)
        {
            res.status(409).send(result.message) 
        }
        else if(result.status == 401)
        {
            res.status(401).send(result.msg.message)
        }
    })

    app.post('/addProductReview', async(req,res) => {
        let incomingData = req.body
        let reviewerUserId = incomingData.reviewerUserId
        let reviewedProductId = incomingData.reviewedProductId
        let reviewContent = incomingData.reviewContent
        console.log(incomingData)
        let result = await addProductReview(reviewerUserId, reviewedProductId,reviewContent)
        if(result.status == 200)
        {
            res.status(200).send(result.msg)
        }
        else
        {
            res.status(401).send(result.msg)
        }
    })

    app.get('/isUserLoggedIn', (req,res) => {
        if(req.session.user)
        {
            res.send(true)
        }
        else
        {
            res.send(false)
        }

    })

    app.get('/logout', (req,res) => {
        if(req.session)
        {
            req.session.destroy()
            res.clearCookie('connect.sid', {path: '/'})
            res.status(200).send({status: 200, msg: 'logging out'})
        }
    })

    app.get('/getAllMarketplaces', async (req,res) => {
        let result = await getAllMarketplaces()
        res.status(200).send(result)
    })

    app.get('/getCurrentUserSession', async(req,res) => {
        res.send(req.session)
    })

    app.post('/searchMarketplacesByTags', async (req,res) => {
        let incomingData = req.body
        let tags = incomingData.tags
        let result = await getMarketplacesByTags(tags)
        res.status(200).send(result)
    })
    
    app.post('/getMarketplaceById', async(req,res) => {
        let incomingData = req.body
        let marketplaceID = incomingData.marketplaceID
        
        try{
            let targetMarketplace = await getMarketplaceById(marketplaceID)
            let currentUserID = req.session.user.id
            let marketplaceOwnerID = targetMarketplace.marketplaceOwner._id

            let isCurrentUserOwner = false
            if(currentUserID.equals(marketplaceOwnerID))
            {
                isCurrentUserOwner = true
            }
            else
            {
                isCurrentUserOwner = false
            }
            
            res.status(200).send({targetMarketplace: targetMarketplace, isCurrentUserOwner: isCurrentUserOwner})
        }
        catch(err)
        {
            res.send(err)
        }

    })

    app.post('/marketplaceReviewHelpful', async(req,res) => {
        let incomingData = req.body
        let userID = incomingData.userID
        let marketplaceID = incomingData.marketplaceID
        let reviewID = incomingData.reviewID

        let result = await marketplaceHelpful(userID, marketplaceID, reviewID)
        console.log(result)
        if(result.status == 200)
        {
            res.status(200).send('Helpful review feedback added successfully!')
        }
        res.send(result.msg)
    })

    app.post('/marketplaceReviewNotHelpful', async(req,res) => {
        let incomingData = req.body
        let userID = incomingData.userID
        let marketplaceID = incomingData.marketplaceID
        let reviewID = incomingData.reviewID


        let result = await marketplaceNotHelpful(userID, marketplaceID, reviewID)
        if(result.status == 200)
        {
            res.status(200).send('Not helpful review feedback added successfully!')
        }
        res.send(result.msg)
    })

    app.get('/getSessionData', async(req,res) => {
        res.status(200).send(req.session.user.id)
    })

    app.post('/getUserById', async(req,res) => {
        let result = await checkUserExistsById(req.body.id)
        res.status(200).send(result)
    })

    app.post('/uploadProfilePicture', upload.single('pfp'), async(req,res) => {
        let targetUserID = req.body.userID
        try{

            let pfp = {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/jpg'
            }
            let result = await updateProfilePicture(targetUserID, pfp)
            // targetUser.profilePicture = pfp
            // await targetUser.save()
            // console.log(targetUser)
        }
        catch(err)
        {
            console.log(err)
        }
    })

    app.post('/uploadCoverPicture', upload.single('pfp'), async(req,res) => {
        let targetUserID = req.body.userID
        try{

            let coverPicture = {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/jpg'
            }
            let result = await updateCoverPicture(targetUserID, coverPicture)

        }
        catch(err)
        {
            console.log(err)
        }
    })

    app.post('/getProductById', async(req,res) => {
        let incomingData = req.body
        let targetProductId = incomingData.TargetProductId
        let result = await findProductById(targetProductId)
        res.send(result)
    })
    //#region endpoints


    //#endregion


    app.listen(3001, () => {
        console.log('express server works!')
    })
}

startServer()