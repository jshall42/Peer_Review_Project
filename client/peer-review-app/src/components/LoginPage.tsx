import { useState, useEffect } from "react"
import type { FormEvent } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

function LoginPage() {
    // State to store email and password input values
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    // email and password validation regex
    const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

    // validate inputs whenever they change
    useEffect(() => {
        validateEmail(email)
    }, [email])

    useEffect(() => {
        validatePassword(password)
    }, [password])

    // Email validation function
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

    // Password validation function
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

    // handling form submission
    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const isEmailValid = validateEmail(email)
        const isPasswordValid = validatePassword(password)
        
        // Checks to see if the validation failed or not
        if (!isEmailValid || !isPasswordValid) {
            Swal.fire({
                title: "Error",
                text: "Please input login information first.",
                icon: "error"
            })
            return
        }
        
        // successful login alert (for demonstration)
        Swal.fire({
            title: "Login Successful",
            text: "You are being redirected...",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        })
    }

    return (
        <div className="row justify-content-center" style={{ marginTop: "100px" }}>
            <form className="card col-12 col-md-8 col-lg-6" id="frmLogin" onSubmit={handleLogin}>
                <div className="card-body text-center">
                    <h1 className="text-center mb-0 text-primary">PeerReview</h1>
                    <h3 className="text-center mb-4">Login</h3>

                    <div className="form-group">
                        <input
                            id="txtLoginUsername"
                            className={`form-control ${emailError ? 'is-invalid' : ''}`}
                            type="email"
                            placeholder="johndoe@email.com"
                            aria-label="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <div className="invalid-feedback text-start">{emailError}</div>}
                    </div>

                    <div className="form-group mt-2">
                        <input
                            id="txtLoginPassword"
                            className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                            type="password"
                            placeholder="password"
                            aria-label="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <div className="invalid-feedback text-start">{passwordError}</div>}
                    </div>

                    <hr />
                    <button className="btn btn-primary col-12 mt-2" type="submit" id="btnLogin">
                        Log In
                    </button>
                    <div className="mt-2">
                        <Link to="/forgotpassword" className="d-block mb-2">
                            Forgot Password
                        </Link>
                        <Link to="/registration" className="d-block">
                            Need an account? Register here!
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginPage