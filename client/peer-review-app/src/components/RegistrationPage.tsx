import { useState, useEffect } from "react"
import type { FormEvent } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

function RegistrationPage(){
    // State to store input values

    // Account related fields
    const [email, setEmail] = useState("")
    const [emailError,setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError,setPasswordError] = useState("")

    // Name fields
    const [firstName, setFirstName] = useState("")
    const [firstNameError,setFirstNameError] = useState("")
    const [lastName, setLastName] = useState("")
    const [lastNameError,setLastNameError] = useState("")

    // Registration type field
    const [type, setType] = useState("")
    const [typeError,setTypeError] = useState("")

    // Contact info fields
    const [contactMethod, setContactMethod] = useState("")
    const [contactMethodError,setContactMethodError] = useState("")
    const [contact, setContact] = useState("")
    const [contactError,setContactError] = useState("")
    const [contactPlaceholder, setContactPlaceholder] = useState("Email/Number/Teams Name/Discord Name")

    // email, password, and phone validation regex
    const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const regPhone = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/
        


    // Validate inputs whenver there changed
    useEffect(() => {
        validateEmail(email)
    }, [email])

    useEffect(() => {
        validatePassword(password)
    }, [password])

    
    useEffect(() => {
        validateFirstName(firstName)
    }, [firstName])

    useEffect(() => {
        validateLastName(lastName)
    }, [lastName])

    
    useEffect(() => {
        validateType(type)
    }, [type])

    useEffect(() => {
        validateContactMethod(contactMethod)
    }, [contactMethod])

    useEffect(() => {
        validateContact(contact, contactMethod)
    }, [contact, contactMethod])


    // Validation Functions for all inputs(cleaner and more modular then previous way I was doing it)
    const validateEmail = (email: string) => {
        if (email.trim() === "") {
            setEmailError("")
            return false
        }
        
        if (!regEmail.test(email.trim().toLowerCase())) {
            setEmailError("Username must be a valid email address")
            return false
        }
        
        setEmailError("")
        return true
    }

    
    const validatePassword = (password: string) => {
        if (password.trim() === "") {
            setPasswordError("")
            return false
        }
        
        if (!regPassword.test(password.trim())) {
            setPasswordError("Password must be at least 8 characters with uppercase, lowercase & number")
            return false
        }
        
        setPasswordError("")
        return true
    }

    const validateFirstName = (firstName: string) => {
        if (firstName.trim() === "") {
            setFirstNameError("Must Provide a First Name")
            return false
        }
        
        setFirstNameError("")
        return true
    }

    const validateLastName = (lastName: string) => {
        if (lastName.trim() === "") {
            setLastNameError("Must Provide a Last Name")
            return false
        }
        
        setLastNameError("")
        return true
    }

    
    const validateType = (type: string) => {
        if (type.trim() === "") {
            setTypeError("")
            return false
        }
        
        if (type != "teacher" && type != "student") {
            setTypeError("Please choose one of the values(Teacher,Student)")
            return false
        }
        
        setTypeError("")
        return true
    }

    
    const validateContactMethod = (contactMethod: string) => {
        if (contactMethod.trim() === "") {
            setContactMethodError("")
            return false
        }
        
        if (contactMethod != "email" && contactMethod != "mobile" && contactMethod != "teams" && contactMethod != "discord") {
            setContactMethodError("Please choose one of the values(Email,Mobile,Teams,Discord)")
            return false
        }
        
        setContactMethodError("")
        return true
    }

    const validateContact = (contact: string, contactMethod: string) => {
        if (contact.trim() === "") {
            setContactMethodError("")
            return false
        }
        
        if (contact.trim().length < 1) {
            setContactError("Must Provide Contact Info")
            return false
        }
        if (contactMethod === "email" && !regEmail.test(contact.trim())) {
            setContactError("Must Provide Valid Email")
            return false
        }
        if (contactMethod === "mobile" && !regPhone.test(contact.trim())) {
            setContactError("Must Provide Valid Phone Number")
            return false
        }
        if (contactMethod === "teams" && contact.trim().length < 1) {
            setContactError("Must Provide Teams Username")
            return false
        }
        if (contactMethod === "discord" && contact.trim().length < 1) {
            setContactError("Must Provide Discord Username")
            return false
        }
        
        setContactError("")
        return true
    }


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

    // Handles when submiting the form
    const handleRegistration = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const isEmailValid = validateEmail(email)
        const isPasswordValid = validatePassword(password)
        const isFirstNameValid = validateFirstName(firstName)
        const isLastNameValid = validateLastName(lastName)
        const isTypeValid = validateType(type)
        const isContactMethodValid = validateContactMethod(contactMethod)
        const isContactValid = validateContact(contact,contactMethod)
        
        // Error if above catches any            
        if (
            !isEmailValid ||
            !isPasswordValid ||
            !isFirstNameValid ||
            !isLastNameValid ||
            !isTypeValid ||
            !isContactMethodValid ||
            !isContactValid
            ) {
                Swal.fire({
                    title: "Error",
                    text: "Input information in first.",
                    icon: "error"
                })
                return
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
                        className={`form-control mt-2 ${emailError ? 'is-invalid' : ''}`}
                        type="email" 
                        placeholder="johndoes@email.com" 
                        aria-label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <div className="invalid-feedback text-start">{emailError}</div>}

                        <input id="txtPassword" 
                        className={`form-control mt-2 ${passwordError ? 'is-invalid' : ''}`}
                        type="password" 
                        placeholder="password" 
                        aria-label="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <div className="invalid-feedback text-start">{passwordError}</div>}

                        <div className="input-group mt-2">
                            <label className="input-group-text" htmlFor="registerationType">Choose One</label>

                            <select 
                            className={`form-select ${typeError ? 'is-invalid' : ''}`} 
                            id="registerationType" 
                            value={type}
                            onChange={(e) => setType(e.target.value)}>

                                <option value="" disabled>Registration Type</option>
                                <option value="teacher" aria-label="Teacher">Teacher</option>
                                <option value="student" aria-label="Student">Student</option>
                            </select>
                            {typeError && <div className="invalid-feedback text-start">{typeError}</div>}
                        </div>

                        {/* This is the Personal Info section with Name, First and last. */}
                        <h5 className="text mt-2">Personal Information</h5>

                        <input id="txtFirstname" 
                        className={`form-control mt-2 ${firstNameError ? 'is-invalid' : ''}`} 
                        type="text" 
                        placeholder="First Name" 
                        aria-label="input for first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                        {firstNameError && <div className="invalid-feedback text-start">{firstNameError}</div>}

                        <input id="txtLastname"
                        className={`form-control mt-2 ${lastNameError ? 'is-invalid' : ''}`} 
                        type="text" 
                        placeholder="Last Name" 
                        aria-label="input for last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        />
                        {lastNameError && <div className="invalid-feedback text-start">{lastNameError}</div>}

                        {/* Contanct Info for best way to contact and the method of contact */}
                        <h5 className="text mt-2">Contact Information</h5>
                        <div className="input-group mt-2">

                            <label className="input-group-text" htmlFor="inputGroupSelect01">Choose One</label>
                            <select 
                            className={`form-select ${contactMethodError ? 'is-invalid' : ''}`} 
                            id="inputGroupSelect01" 
                            value={contactMethod} 
                            onChange={(e) => setContactMethod(e.target.value)}>

                                <option value="" disabled>Best way to contact you!</option>
                                <option value="email" aria-label="Email">Email</option>
                                <option value="mobile" aria-label="Mobile">Mobile</option>
                                <option value="teams" aria-label="Teams">Teams</option>
                                <option value="discord" aria-label="Discord">Discord</option>
                            </select>
                            {contactMethodError && <div className="invalid-feedback text-start">{contactMethodError}</div>}
                        </div>

                        {/* Links to the other pages (SPA standards) */}
                        <input 
                        id="txtUsernameContact" 
                        className={`form-control mt-2 ${contactError ? 'is-invalid' : ''}`} 
                        type="text" 
                        placeholder={contactPlaceholder}
                        aria-label="Contact Username,email,or number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        />
                        {contactError && <div className="invalid-feedback text-start">{contactError}</div>}
                        
                        <hr/>
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