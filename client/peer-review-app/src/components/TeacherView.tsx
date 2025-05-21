import { useState } from "react"
import {Button, Modal, ModalBody, ModalFooter, Form, Row, Col} from 'react-bootstrap'
import type { FormEvent } from "react"
import Swal from "sweetalert2"
import CourseCard from "./CourseCard"

/* Just learned that there is a React-Bootstrap module that would have made my life easier so thats why the styling of the code will
look different from Login and Registration. */

function TeacherView(){
    const [show, setShow] = useState(false)
    const [validated, setValidated] = useState(false)
    const [refreshCourses, setRefreshCourses] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget as HTMLFormElement
        const userEmail = sessionStorage.getItem("userEmail")
        setValidated(true)

        const formData = new FormData(form)

        const courseData = {
            courseName: formData.get("courseName") as string,
            courseNumber: formData.get("courseNumber") as string,
            courseSection: formData.get("courseSection") as string,
            courseTerm: formData.get("courseTerm") as string,
            startDate: formData.get("startDate") as string,
            endDate: formData.get("endDate") as string,
            instructorEmail: userEmail
        }


        // send course info to backend
        fetch("http://localhost:8080/peerreview/course", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( courseData )
        }).then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    Swal.fire({
                        title: "Success!",
                        html: `<p class='mb-0 mt-0'>Course was added!</p>`,
                        icon: "success",
                        allowOutsideClick: false,
                        confirmButtonText: "Continue"
                    }).then(result => {
                        if(result.isConfirmed){
                            setRefreshCourses(prev => !prev)
                            handleClose()
                        }
                    })
                } else {
                    Swal.fire({
                        title: "Course Creation Failed",
                        html: "<p class='mb-0 mt-0'>Server Error try agian later</p>",
                        icon: "error"
                    })
                }
            })
            .catch(error => {
                console.error("Course Creation request failed:", error)
                Swal.fire({
                    title: "Error",
                    html: "<p class='mb-0 mt-0'>Something went wrong. Please try again later.</p>",
                    icon: "error"
                })
            })
    }
    
    return(
        <>
        <CourseCard refresh={refreshCourses}></CourseCard>
        <Button variant="primary" onClick={handleShow}>
            Create Course
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Create Course</Modal.Title>
            </Modal.Header>
            <ModalBody>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col md={4}>
                        <Form.Group className="mb-3" controlId="formCourseName">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control
                            required
                            placeholder="Ex: Web Dev"
                            type="text"
                            name="courseName"
                            />
                            <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Enter Course Name</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                        <Col md={4}>
                        <Form.Group className="mb-3" controlId="formCourseNumber">
                            <Form.Label>Course Number</Form.Label>
                            <Form.Control
                            required
                            type="text" 
                            placeholder="Ex: CSC 3100"
                            name="courseNumber" />
                            <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Enter Course Number</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                        <Col md={4}>
                        <Form.Group className="mb-3" controlId="formCourseSection">
                            <Form.Label>Course Section</Form.Label>
                            <Form.Control
                            required
                            type="text" 
                            placeholder="Ex: 201"
                            name="courseSection" />
                            <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Enter Course Section</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                        <Form.Group className="mb-3" controlId="formCourseTerm">
                            <Form.Label>Course Term</Form.Label>
                            <Form.Control
                            required 
                            type="text" 
                            placeholder="Ex: Spring"
                            name="courseTerm" />
                            <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Enter Course Term</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                        <Col md={4}>
                        <Form.Group className="mb-3" controlId="formStartDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                            required 
                            type="date" 
                            placeholder="mm/dd/yyyy"
                            name="startDate" />
                            <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Enter Start Date</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                        <Col md={4}>
                        <Form.Group className="mb-3" controlId="formEndDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control 
                            required
                            type="date" 
                            placeholder="mm/dd/yyyy" 
                            name="endDate"/>
                            <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Enter End Date</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </ModalBody>
            <ModalFooter>

            </ModalFooter>
            
        </Modal>

        
        </>
    )
}

export default TeacherView