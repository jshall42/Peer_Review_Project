import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

// Course Object and its info that it holds
interface Course {
    coursename: string
    coursenumber: string
    courseid: string
    coursesection: string
    courseterm: string
    instructorname: string
}

function CourseCard({ refresh }: { refresh: boolean }) {
    const navigate = useNavigate()
    // useState with an array of Course Objs
    const [courses, setCourses] = useState<Course[]>([])

    // Gets courses from db and sends back to be displayed and refreshes after adding course (Will add deleting course at later date)
    useEffect(() => {
        const userEmail = sessionStorage.getItem("userEmail")
        if (!userEmail) {
            console.error("No user email found in localStorage.")
            return
        }
        const fetchCourses = async () => {
            try {
                const response = await fetch(`http://localhost:8080/peerreview/courses?userEmail=${encodeURIComponent(userEmail)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                if (!response.ok) {
                    const data = await response.json()
                    throw new Error(data.message || "Failed to fetch courses")
                }

                const data = await response.json()
                setCourses(data.courses)
            } catch (error: any) {
                Swal.fire("Error", error.message, "error")
            }
        }

        fetchCourses()
    }, [refresh])

    // When pressing on a course it will send you to that courses page(student and teacher have different views), and sends id for backend tracking
    const openDashboard = (id:string) => {
        navigate(`/course/${id}/*`)
    }

    return (
        <>
            {courses.map((course, index) => (
                <div className="col-md-4 mb-4" key={index}>
                    <button className="btn w-100 text-start p-3 shadow-sm border-0 bg-white" onClick={() => openDashboard(course.courseid)}>
                        <h5 className="mb-1">{course.coursename} {course.coursenumber}</h5>
                        <p className="mb-0">Course Code: {course.courseid}</p>
                        <p className="mb-0">Section: {course.coursesection}</p>
                        <p className="mb-0">Term: {course.courseterm}</p>
                        <p className="mb-0">Instructor: {course.instructorname}</p>
                    </button>
                </div>
            ))}
        </>
    )
}

export default CourseCard
