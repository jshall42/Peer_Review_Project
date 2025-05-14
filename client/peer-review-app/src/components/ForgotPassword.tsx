

function ForgotPassword(){
    
    return(
        <div className="row justify-content-center" style={{ marginTop: "150px" }}>
            <form className="card col-12 col-md-8 col-lg-6" id="frmPassword">
                    <div className="card-body">
                        <h1 className="text-center mb-0 text-primary">PeerReview</h1>
                        <h3 className="text-center mb-4">Please Provide an Email</h3>

                        <input id="txtEmail" className="form-control" type="email" placeholder="johndoes@email.com" aria-label="email"/>
                        
                        <hr />
                        <button className="btn btn-primary col-12 mt-2" type="button" id="btnResetPassword">Send Reset</button>
                    </div>
            </form>
        </div>
    )
}

export default ForgotPassword