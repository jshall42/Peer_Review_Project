import logo from '../assets/PeerReviewIcon.png'
import { Link } from 'react-router-dom'

function HomePage(){
    return(
        <div className="text-center">
                    <img src={logo} alt="PeerReview Logo" width="100" className="mb-4"></img>
                    <h1 className="display-5 fw-bold text-primary">Welcome to PeerReview</h1>
                    <p className="lead mt-3 mb-4">
                        Empowering students and instructors to engage in transparent, meaningful feedback with ease.
                    </p>
                    <hr className="my-4"></hr>
                    <div className="row justify-content-center">
                        <div className="col-10 col-md-6">
                            <h3 className="text-secondary mb-3">What can you do here?</h3>
                            <ul className="list-group text-start mb-4">
                                <li className="list-group-item">🧑‍🏫 <strong>Instructors:</strong> Create courses, teams, and review activities.</li>
                                <li className="list-group-item">👩‍🎓 <strong>Students:</strong> Participate in anonymous peer reviews and view personalized reports.</li>
                                <li className="list-group-item">🔐 Secure login with MFA and password recovery.</li>
                                <li className="list-group-item">📊 Real-time feedback and performance metrics.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-2 d-flex justify-content-center gap-3">
                        <Link className="btn btn-primary" to="/registration">Get Started!</Link>
                        <Link className="btn btn-primary" to="/login">Login</Link>
                    </div>
            </div>
        
    )
}

export default HomePage