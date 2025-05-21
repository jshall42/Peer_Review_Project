import { useState } from "react"
import {Button, Modal, ModalBody, ModalFooter, Form, Row, Col} from 'react-bootstrap'
import type { FormEvent } from "react"
import Swal from "sweetalert2"
import CourseCard from "./CourseCard"

function StudentView(){

    const [show, setShow] = useState(false)
    const [validated, setValidated] = useState(false)
    const [refreshCourses, setRefreshCourses] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget as HTMLFormElement
        const formData = new FormData(form)
        const userID = sessionStorage.getItem("userID")
        const courseID = formData.get("courseID") as string
        setValidated(true)

        // send course info to backend
        fetch("http://localhost:8080/peerreview/enroll", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( {courseID, userID} )
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
                Add Course
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create Course</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                            <Form.Group className="mb-3" controlId="formCourseCode">
                                <Form.Label>Course Code</Form.Label>
                                <Form.Control
                                required
                                placeholder="Ex: Web Dev"
                                type="text"
                                name="courseID"
                                />
                                <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Enter Course Code</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">
                            Add Course
                        </Button>
                    </Form>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
                
            </Modal>
        </>
    )
}


export default StudentView