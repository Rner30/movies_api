const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const dbConnection = require('./db/db')

const UserRoute = require('./routes/user.routes')
const MoviesRoute = require('./routes/movie.routes')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

dbConnection()

app.use('/api/user',UserRoute)
app.use('/api/movies',MoviesRoute)

app.listen(process.env.PORT, ()=>{
    console.log("SERVER UP");
})



