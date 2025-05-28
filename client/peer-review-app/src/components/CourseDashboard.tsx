import { Nav } from 'react-bootstrap'
import { Link, Outlet, useParams, useLocation} from "react-router-dom"

function CourseDashboard(){
    // So id isnt static can load course dynamically (different students for different courses, etc.)
    const { id } = useParams()
    // makes it so that active key is checked agianest the pathname
    const location = useLocation()


    // Using react-dom nested links to show info
    return(
        <>
            <Nav justify variant="pills" activeKey={location.pathname}>
                <Nav.Item>
                    <Nav.Link as={Link} to={`/course/${id}/enrollment`} eventKey={`/course/${id}/enrollment`}>Enrollment</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to={`/course/${id}/assessment`} eventKey={`/course/${id}/assessment`}>Assessment</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to={`/course/${id}/feedback`} eventKey={`/course/${id}/feedback`}>Feedback</Nav.Link>
                </Nav.Item>
            </Nav>


            <Outlet/>
        
        </>
    )
}

export default CourseDashboard