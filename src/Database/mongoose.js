const mongoose = require('mongoose')

let dbName = 'marketplaceDB'

let connectionString = `mongodb://localhost:27017/${dbName}`

module.exports = async(app) => {
    try{
        
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Successfully connected with the database')

        mongoose.connection.on('error', (err) => {
            console.log('A database error occured')
            console.log(err)
        })
    }
    catch(err)
    {
        console.log('An error occured while attempting to connect to the database.')
        console.log(err)
        process.exit(1)
    }

}