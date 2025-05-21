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

app.post('/peerreview/user', async (req, res, next) => {
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

app.post('/peerreview/login', async (req, res, next) => {
    try {
        // getting the user info from the front
        let strEmail = req.body.email.trim().toLowerCase()
        let strPassword = req.body.password
        

        //selecting the user from the db to see if they exist
        const checkUser = await db.query(`SELECT * FROM tblUsers WHERE Email = $1`, [strEmail])

        if (checkUser.rows.length === 0) {
            return res.status(400).json({
                status: "error",
                message: "Email or Password is invalid."
            })
        }

        const user = checkUser.rows[0]
        
        const isMatch = await bcrypt.compare(strPassword, user.password)

        if(!isMatch){
            return res.status(401).json({
                status: "error",
                message: "Email or Password is invalid."
            })
        }

        await db.query(`UPDATE tblUsers SET LastLoginDate = $1 WHERE Email = $2`, [
            new Date().toISOString(),
            strEmail
        ])

        res.status(200).json({
            status: "success",
            message: "Login successful",
            user: {
                uid: user.uid,
                email: user.email,
                firstName: user.firstname,
                lastName: user.lastname,
                userType: user.usertype
            }
        })
        
    } catch (error) {
        console.error("Uncaught error in login:", error)
        res.status(500).json({
            status: "error",
            message: "Server error during login: " + error.message
        })
    }
})

app.post('/peerreview/course', async (req, res, next) => {
    try {
        // getting the course info from the front end
        let strCourseName = req.body.courseName
        let strCourseNumber = req.body.courseNumber
        let strCourseSection = req.body.courseSection
        let strCourseTerm = req.body.courseTerm
        let strStartDate = req.body.startDate
        let strEndDate = req.body.endDate
        let strCourseID = uuidv4().substring(0,5)
        let strInstructorEmail = req.body.instructorEmail

        // check the user input
        if (!strCourseName || !strCourseNumber || !strCourseSection || !strCourseTerm ||
            !strStartDate || !strEndDate || !strCourseID) {
            return res.status(400).json({
                status: "error",
                message: "All course fields are required"
            })
        }

        strCourseName = strCourseName.trim()
        strCourseNumber = strCourseNumber.trim()
        strCourseSection = strCourseSection.trim()
        strCourseTerm = strCourseTerm.trim()
        strStartDate = strStartDate.trim()
        strEndDate = strEndDate.trim()
        strCourseID = strCourseID.trim()
        strInstructorEmail = strInstructorEmail.trim()

        // add course to data base
        await db.query(`
            INSERT INTO tblCourses (CourseID, CourseName, CourseNumber, CourseSection, CourseTerm, StartDate, EndDate, InstructorEmail)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [strCourseID, strCourseName, strCourseNumber, strCourseSection, strCourseTerm, strStartDate, strEndDate, strInstructorEmail])


        res.status(201).json({
            status: "success",
            message: "Course was added"
        })

    } catch (error) {
        console.error("Uncaught error in /peerreview/course:", error)
        res.status(500).json({
            status: "error",
            message: "Server error while creating course: " + error.message
        })
    }
})

app.post('/peerreview/enroll', async (req, res, next) => {
    try {
        // getting the user email and course code from the front end
        const strUserID = req.body.userID.trim()
        const strCourseID = req.body.courseID.trim()

        // check if the user email and course code are provided
        if (!strCourseID || !strUserID) {
            return res.status(400).json({
                status: "error",
                message: "User email and course code are required"
            })
        }

        // SQL query to enroll the user in the course
        await db.query(`
            INSERT INTO tblEnrollments (CourseID, UserID)
            VALUES ($1, $2)
        `, [strCourseID, strUserID])

        res.status(201).json({
            status: "success",
            message: "Successfully enrolled in course"
        })
        
    } catch (error) {
        console.error("Uncaught error in /peerreview/enroll:", error)
        res.status(500).json({
            status: "error",
            message: "Server error while enrolling in course: " + error.message
        })
    }
})
app.get('/peerreview/courses', async (req, res, next) => {
    try {
        // Get and sanitize the user email
        const userEmail = req.query.userEmail?.trim().toLowerCase()

        // Validate email presence
        if (!userEmail) {
            return res.status(400).json({
                status: "error",
                message: "User email is required"
            })
        }

        // Run query to fetch courses where the user is either instructor or enrolled student
        const { rows } = await db.query(`
            SELECT 
            c.coursename,
            c.coursenumber,
            c.courseid,
            c.coursesection,
            c.courseterm,
            u.firstname || ' ' || u.lastname AS instructorname
        FROM tblcourses c
        JOIN tblusers u ON c.instructoremail = u.email
        WHERE c.instructoremail = $1
        OR c.courseid IN (
            SELECT courseid 
            FROM tblenrollments 
            WHERE userid = (SELECT userid FROM tblusers WHERE email = $2)
        )
            `, [userEmail, userEmail])

        // Respond with course data
        res.status(200).json({
            status: "success",
            courses: rows
        })

    } catch (error) {
        console.error("Uncaught error in /peerreview/courses:", error)
        res.status(500).json({
            status: "error",
            message: "Server error while retrieving courses: " + error.message
        })
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
