const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()

const db = require('./db')
const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

const intSalt = 10


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
