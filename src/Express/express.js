const express = require('express')
const cors = require('cors')

const databaseConfig = require('../Database/mongoose')
const mongoose = require('mongoose')

var bodyParser = require('body-parser')


async function startServer(){

    const app = express()
    app.use(cors)
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    await databaseConfig(app)

    app.listen(3001, () => {
        console.log('express server works!')
    })
}

startServer()