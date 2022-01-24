const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const dbConnection = require('./db/db')


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

dbConnection()

app.listen(process.env.PORT, ()=>{
    console.log("SERVER UP");
})



