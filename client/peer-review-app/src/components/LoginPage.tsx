import { useState } from "react"
import type { FormEvent } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

function LoginPage() {
    // State to store email and password input values
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    // Handle form submission
    const handleLogin = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        
        email = email.toLowerCase()
        let blnError = false
        let strMessage = ""
        
     // check if the username and password are valid
        if (!regEmail.test(email.trim())) {
            blnError = true
            strMessage += "<p class='mb-0 mt-0'>Username Must Be an Email Address</p>"
        }

        if (!regPassword.test(password.trim())) {
            blnError = true
            strMessage += "<p class='mb-0 mt-0'>Password Must Be at Least 8 Characters Long and Contain at Least One Uppercase Letter, One Lowercase Letter, and One Number</p>"
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

    return (
        <div className="row justify-content-center" style={{ marginTop: "100px" }}>
            <form className="card col-12 col-md-8 col-lg-6" id="frmLogin" onSubmit={handleLogin}>
                <div className="card-body text-center">
                    <h1 className="text-center mb-0 text-primary">PeerReview</h1>
                    <h3 className="text-center mb-4">Login</h3>

                    {/* Input fields for email and password */}
                    <input
                        id="txtLoginUsername"
                        className="form-control"
                        type="email"
                        placeholder="johndoes@email.com"
                        aria-label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  // set/update email state
                    />
                    <input
                        id="txtLoginPassword"
                        className="form-control mt-2"
                        type="password"
                        placeholder="password"
                        aria-label="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}  // set/update password state
                    />

                    <hr />
                    {/* Button to submit the form */}
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
