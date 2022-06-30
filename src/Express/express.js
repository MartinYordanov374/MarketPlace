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
const {deleteProduct} = require('../API/productAPI/deleteProductFromMarketplace')
const { deleteProductAbsolutely } = require('../API/productAPI/deleteProductAbsolutely')
const { addUserReview } = require('../API/userAPI/addUserReview')
const { addUserRating } = require('../API/userAPI/addUserRating')
const { addMarketplaceReview } = require('../API/marketplaceAPI/addMarketplaceReview')
const { addMarketplaceRating } = require('../API/marketplaceAPI/addMarketplaceRating')
const { addProductRating } = require('../API/productAPI/addProductRating')
const { addProductReview } = require('../API/productAPI/addProductReview')


async function startServer(){
    //#region configurations
    const app = express()
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    await databaseConfig(app)
    //#endregion
    
    app.post('/register', async (req,res) => {
        let incomingData = req.body
        let username = incomingData.username
        let notHashedPassword = incomingData.password

        let registerResult = await registerUser(username, notHashedPassword)
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
            res.status(200).send('Login successful')
        }
        else if(loginResult.status == 401)
        {
            res.status(401).send('Wrong password')
        }
        else{
            res.status(404).send('That user doesn\'t exist')
        }
    })
    
    app.post('/createMarketplace', async(req,res) => {
        let incomingData = req.body
        // TODO CHANGE THE USERNAME TO ID 
        let username = incomingData.userID
        let description = incomingData.marketplaceDescription
        let marketplaceTags = incomingData.marketplaceTags
        let marketplaceName = incomingData.marketplaceName
        // TODO ADD CHECK IF USER EXISTS BEFORE CREATING MARKETPLACE
        
        let result = await createMarketplace(username,description, marketplaceTags, marketplaceName)
        
        if(result.status == 200)
        {
            res.status(200).send(result.msg)
        }
        else
        {
            res.status(402).send(result.msg)
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

    app.post('/createProduct', async(req,res) => {
        let incomingData = req.body
        let creatorID = incomingData.creatorID
        let productName = incomingData.productName  
        let productDescription = incomingData.productDescription
        let productPrice = incomingData.productPrice
        let productMarketplaceID = incomingData.productMarketplaceID

        let result = await createProduct(creatorID,productName,productDescription,productPrice,productMarketplaceID)
        if(result.status == 200)
        {
            res.status(200).send(result.msg)
        }
        else
        {
            res.status(401).send(result.msg)
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

        console.log(result)
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
    //#region endpoints




    //#endregion


    app.listen(3001, () => {
        console.log('express server works!')
    })
}

startServer()