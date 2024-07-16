const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('../backend/config/db.js')
const router = require('../backend/routes/index.js')


const app = express()
app.use(cors({
    origin : process.env.FRONT_URL,
    credentials : true
}))
app.use(express.json())
app.use("/api", router)
app.use(cookieParser())

const PORT = 8080 || process.env.PORT


connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("connect to DB")
        console.log("server is running")
    })
})
