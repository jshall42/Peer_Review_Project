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

app.post('/peerreview/user', async (req, res) => {
    try {
        // get info from frontend
        let strEmail = req.body.email.trim().toLowerCase()
        let strPassword = req.body.password
        let strFirstName = req.body.firstName.trim()
        let strLastName = req.body.lastName.trim()
        let strContactType = req.body.contactType
        let strContactInfo = req.body.contactInfo
        let creationDateTime = new Date().toISOString()
        let strUserType = req.body.userType

        // validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(strEmail)) {
            return res.status(400).json({
                status: "error",
                message: "You must provide a valid email address"
            })
        }

        // validate password
        if (strPassword.length < 8 ||
            !/[A-Z]/.test(strPassword) ||
            !/[a-z]/.test(strPassword) ||
            !/[0-9]/.test(strPassword)) {
            return res.status(400).json({
                status: "error",
                message: "Password must meet complexity requirements"
            })
        }

        // check if user exists
        const checkUser = await db.query(`SELECT * FROM tblUsers WHERE Email = $1`, [strEmail])
        if (checkUser.rows.length > 0) {
            return res.status(400).json({
                status: "error",
                message: "User with this email already exists"
            })
        }

        // hash password and generate UUID
        const hashedPassword = await bcrypt.hash(strPassword, intSalt)
        const userId = uuidv4()

        // insert into tblUsers
        await db.query(`
            INSERT INTO tblUsers (UID, Email, Password, FirstName, LastName, CreationDate, LastLoginDate, UserType)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [userId, strEmail, hashedPassword, strFirstName, strLastName, creationDateTime, null, strUserType])

        // insert into tblSocials
        await db.query(`
            INSERT INTO tblSocials (SocialType, ContactInfo, UserEmail)
            VALUES ($1, $2, $3)
        `, [strContactType, strContactInfo, strEmail])

        res.status(201).json({
            status: "success",
            message: "User and social info created successfully"
        })

    } catch (error) {
        console.error("Registration error:", error)
        res.status(500).json({
            status: "error",
            message: "Server error during registration: " + error.message
        })
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
