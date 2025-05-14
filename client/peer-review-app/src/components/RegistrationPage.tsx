import { useState, useEffect } from "react"
import type { FormEvent } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

function RegistrationPage(){
    // State to store input values
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")
    let [type, setType] = useState("")
    let [contactMethod, setContactMethod] = useState("")
    let [contact, setContact] = useState("")
    const [contactPlaceholder, setContactPlaceholder] = useState("Email/Number/Teams Name/Discord Name")

    // Changes the placehlder depending on what the user chooses
    useEffect(() => {
        switch (contactMethod) {
            case "email":
                setContactPlaceholder("Email Address")
                break
            case "mobile":
                setContactPlaceholder("Mobile Number")
                break
            case "teams":
                setContactPlaceholder("Teams Username")
                break
            case "discord":
                setContactPlaceholder("Discord Username")
                break
            default:
                setContactPlaceholder("Email/Number/Teams Name/Discord Name")
        }
    }, [contactMethod])

    const handleRegistration = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        const regPhone = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/

        email = email.toLowerCase()
        let blnError = false
        let strMessage = ""

        // Checks the email and password to see if its valid
            if (!regEmail.test(email.trim())) {
                blnError = true
                strMessage += "<p class='mb-0 mt-0'>Username Must Be an Email Address</p>"
            }
    
            if (!regPassword.test(password.trim())) {
                blnError = true
                strMessage += "<p class='mb-0 mt-0'>Password Must Be at Least 8 Characters Long and Contain at Least One Uppercase Letter, One Lowercase Letter, and One Number</p>"
            }
        
        // Checks to see if they have chose a type  
            if (type != "teacher" && type != "student") {
                blnError = true
                strMessage += "<p class='mb-0 mt-0'>Please choose one of the values(Teacher,Student)</p>"
            }
        
        // Checks to see if they inputed a first and last name
            if (firstName.trim().length < 1) {
                blnError = true
                strMessage += "<p class='mb-0 mt-0'>Must Provide a First Name</p>"
            }

            if (lastName.trim().length < 1) {
                blnError = true
                strMessage += "<p class='mb-0 mt-0'>Must Provide a Last Name</p>"
            }

        // Checks to see if they choose a contact method
            if (contactMethod != "email" && contactMethod != "mobile" && contactMethod != "teams" && contactMethod != "discord") {
                blnError = true
                strMessage += "<p class='mb-0 mt-0'>Please choose one of the values(Email,Mobile,Teams,Discord)</p>"
            }

            if (contactMethod === "Best way to contact") {
                blnError = true
                strMessage += "<p class='mb-0 mt-0'>Please choose a contact method</p>"
            }

        // Checks to see if they inputed a contact for there prefered method
            if (contact.trim().length < 1) {
                blnError = true
                strMessage += "<p class='mb-0 mt-0'>Must Provide Contact Info</p>"
            }

            if (contactMethod === "email" && !regEmail.test(contact.trim())) {
                blnError = true
                strMessage += "<p class='mb-0 mt-0'>Must Provide a Valid Email Address</p>"
            }

            if (contactMethod === "mobile" && !regPhone.test(contact.trim())) {
                blnError = true
                strMessage += "<p class='mb-0 mt-0'>Must Provide a Valid Phone Number</p>"
            }

            if (contactMethod === "teams" && contact.trim().length < 1) {
                blnError = true
                strMessage += "<p class='mb-0 mt-0'>Must Provide a Teams Username</p>"
            }
            
            if (contactMethod === "discord" && contact.trim().length < 1) {
                blnError = true
                strMessage += "<p class='mb-0 mt-0'>Must Provide a Discord Username</p>"
            }

            // Error if above catches any            
            if (blnError) {
                Swal.fire({
                    title: "Oh no, you have error!",
                    html: strMessage,
                    icon: "error"
                })
            }

            
    }
    return(
        <div className="row justify-content-center">
            <form className="card col-12 col-md-8 col-lg-6" id="frmRegister" onSubmit={handleRegistration}>
                    <div className="card-body">
                        <h1 className="text-center mb-0 text-primary">PeerReview</h1>
                        <h3 className="text-center mb-4">Registration Form</h3>

                        {/* This is the Account Information section with Email,Password */}
                        <h5 className="text">Account Information</h5>
                        <input 
                        id="txtUsername" 
                        className="form-control" 
                        type="email" 
                        placeholder="johndoes@email.com" 
                        aria-label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                        <input id="txtPassword" 
                        className="form-control mt-2" 
                        type="password" 
                        placeholder="password" 
                        aria-label="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="input-group mt-2">
                            <label className="input-group-text" htmlFor="registerationType">Choose One</label>

                            <select 
                            className="form-select" 
                            id="registerationType" 
                            value={type}
                            onChange={(e) => setType(e.target.value)}>

                                <option selected aria-label="Registration Type">Registration Type</option>
                                <option value="teacher" aria-label="Teacher">Teacher</option>
                                <option value="student" aria-label="Student">Student</option>
                            </select>
                        </div>

                        {/* This is the Personal Info section with Name, First and last. */}
                        <h5 className="text mt-2">Personal Information</h5>

                        <input id="txtFirstname" 
                        className="form-control mt-2" 
                        type="text" 
                        placeholder="First Name" 
                        aria-label="input for first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        />

                        <input id="txtLastname"
                        className="form-control mt-2" 
                        type="text" 
                        placeholder="Last Name" 
                        aria-label="input for last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        />

                        {/* Contanct Info for best way to contact and the method of contact */}
                        <h5 className="text mt-2">Contact Information</h5>
                        <div className="input-group mt-2">

                            <label className="input-group-text" htmlFor="inputGroupSelect01">Choose One</label>
                            <select 
                            className="form-select" 
                            id="inputGroupSelect01" 
                            value={contactMethod} 
                            onChange={(e) => setContactMethod(e.target.value)}>

                                <option selected aria-label="Best way to contact you">Best way to contact</option>
                                <option value="email" aria-label="Email">Email</option>
                                <option value="mobile" aria-label="Mobile">Mobile</option>
                                <option value="teams" aria-label="Teams">Teams</option>
                                <option value="discord" aria-label="Discord">Discord</option>
                            </select>
                        </div>

                        {/* Links to the other pages (SPA standards) */}
                        <input 
                        id="txtUsernameContact" 
                        className="form-control mt-2" 
                        type="text" 
                        placeholder={contactPlaceholder}
                        aria-label="Contact Username,email,or number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        />
                        
                        <hr />
                        <button id="btnSubmit" className="btn btn-primary col-12 mt-1" type="submit" aria-label="submit">Submit</button>
                        <div className="text-center mt-2">
                            <Link to="/login">Already Registered Login here!</Link>
                        </div>
                    </div>
                </form>
        </div>
    )
}

export default RegistrationPage