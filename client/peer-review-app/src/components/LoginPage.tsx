import { Link } from "react-router-dom"

function LoginPage(){
    return(
        <div className="row justify-content-center">
            <form className="card col-12 col-md-8 col-lg-6" id="frmLogin">
                    <div className="card-body text-center">
                        <h1 className="text-center mb-0 text-primary">PeerReview</h1>
                        <h3 className="text-center mb-4">Login</h3>

                        <input id="txtLoginUsername" className="form-control" type="email" placeholder="johndoes@email.com" aria-label="email"/>
                        <input id="txtLoginPassword" className="form-control mt-2" type="password" placeholder="password" aria-label="password"/>

                        <hr />
                        <button className="btn btn-primary col-12 mt-2" type="button" id="btnLogin">Log In</button>
                        <button className="btn btn-link col-12" type="button" id="btnSwapPassword">Forgot Password</button>
                        <Link to="/registration">Need an account, Register here!</Link>
                    </div>
            </form>
        </div>

    )
}


export default LoginPage
