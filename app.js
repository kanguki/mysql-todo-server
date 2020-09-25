const express = require('express')
const http = require('http')
const cors = require('cors')
require('dotenv').config()

const router = require('./router')

const app = express()
const server = http.createServer(app)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

const PORT = 3000 || process.env.PORT
server.listen(PORT, () => {
    console.log('Server is running on port '+ PORT)
})