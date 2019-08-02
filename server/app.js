require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3002
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./helpers/errorHandler')
const cronjobb = require('./helpers/cronjob')

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true,useFindAndModify: false})
.then(resp => {
    console.log("we're connected")
})
.catch(err => {
    console.log("we failed to connect", err)
})

app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.use(cors())

cronjobb()
app.use('/', router)

app.use(errorHandler)

app.listen(port, ()=>{
    console.log('listening in port '+port);
    
})
module.exports = app