const express = require('express')
const cors = require('cors')

const databaseConfig = require('../Database/mongoose')
const mongoose = require('mongoose')

var bodyParser = require('body-parser')


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
        return res.status(200).send({username, notHashedPassword})
    })

    //#region endpoints




    //#endregion


    app.listen(3001, () => {
        console.log('express server works!')
    })
}

startServer()