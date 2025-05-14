import { Link } from "react-router-dom"

function RegistrationPage(){
    return(
        <div className="row justify-content-center">
            <form className="card col-12 col-md-8 col-lg-6" id="frmRegister">
                    <div className="card-body">
                        <h1 className="text-center mb-0 text-primary">PeerReview</h1>
                        <h3 className="text-center mb-4">Registration Form</h3>

                        {/* This is the Account Information section with Email,Password */}
                        <h5 className="text">Account Information</h5>
                        <input id="txtUsername" className="form-control" type="email" placeholder="johndoes@email.com" aria-label="email"/>
                        <input id="txtPassword" className="form-control mt-2" type="password" placeholder="password" aria-label="password"/>

                        <div className="input-group mt-2">
                            <label className="input-group-text" htmlFor="registerationType">Choose One</label>
                            <select className="form-select" id="registerationType">
                                <option selected aria-label="Registration Type">Registration Type</option>
                                <option value="teacher" aria-label="Teacher">Teacher</option>
                                <option value="student" aria-label="Student">Student</option>
                            </select>
                        </div>

                        {/* This is the Personal Info section with Name, First and last. */}
                        <h5 className="text mt-2">Personal Information</h5>
                        <input id="txtFirstname" className="form-control mt-2" type="text" placeholder="First Name" aria-label="input for first name"/>
                        <input id="txtLastname" className="form-control mt-2" type="text" placeholder="Last Name" aria-label="input for last name"/>

                        {/* Contanct Info for best way to contact and the method of contact */}
                        <h5 className="text mt-2">Contact Information</h5>
                    <div className="input-group mt-2">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Choose One</label>
                        <select className="form-select" id="inputGroupSelect01">
                            <option selected aria-label="Best way to contact you">Best way to contact</option>
                            <option value="email" aria-label="Email">Email</option>
                            <option value="mobile" aria-label="Mobile">Mobile</option>
                            <option value="teams" aria-label="Teams">Teams</option>
                            <option value="discord" aria-label="Discord">Discord</option>
                        </select>
                    </div>

                        {/* Links to the other pages (SPA standards) */}
                        <input id="txtUsernameContact" className="form-control mt-2" type="text" placeholder="Email/Number/Teams Name/Discord Name" aria-label="Contact Username,email,or number"/>
                        
                        <hr />
                        <button id="btnSubmit" className="btn btn-primary col-12 mt-1" type="button" aria-label="submit">Submit</button>
                        <Link to="/login">Already Registered Login here!</Link>
                    </div>
                </form>
        </div>
    )
}

export default RegistrationPage