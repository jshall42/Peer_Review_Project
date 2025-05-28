import { Table } from 'react-bootstrap'
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import Swal from "sweetalert2"

interface Student {
    firstname: string
    lastname: string
    email: string
}

function EnrollmentTab(){
    const { id } = useParams()
    const [students, setStudents] = useState<Student[]>([])
    useEffect(() => {
            if (!id) {
                console.error("Id could not be found.")
                return
            }
            const fetchStudents = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/peerreview/enrollment?courseID=${encodeURIComponent(id)}`, {
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
                    setStudents(data.students)
                } catch (error: any) {
                    Swal.fire("Error", error.message, "error")
                }
            }
    
            fetchStudents()
        },  [id])
    return(
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{student.firstname}</td>
                            <td>{student.lastname}</td>
                            <td>{student.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        
        </>
    )
}

export default EnrollmentTab