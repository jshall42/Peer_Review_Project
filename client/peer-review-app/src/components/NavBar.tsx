import { Link } from 'react-router-dom'
import logo from '../assets/PeerReviewIcon.png'

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
            <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-1" />
            <Link className="navbar-brand" to="/">PeerReview</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link className="nav-link text-white" to="/">Home</Link>
                </li>
            </ul>

            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                <Link className="nav-link text-white" to="/registration">Sign Up</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link text-white" to="/login">Log In</Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
}

export default NavBar
