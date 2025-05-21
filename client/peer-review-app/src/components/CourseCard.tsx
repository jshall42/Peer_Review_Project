import { useEffect, useState } from "react"
import Swal from "sweetalert2"

interface Course {
    coursename: string
    coursenumber: string
    courseid: string
    coursesection: string
    courseterm: string
    instructorname: string
}

function CourseCard() {
    const [courses, setCourses] = useState<Course[]>([])


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
    }, [])

    return (
        <>
            {courses.map((course, index) => (
                <div className="col-md-4 mb-4" key={index}>
                    <button className="btn w-100 text-start p-3 shadow-sm border-0 bg-white">
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
