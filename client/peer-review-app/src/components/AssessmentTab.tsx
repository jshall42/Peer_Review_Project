import { useState } from "react"
import {Button, Modal, ModalBody, ModalFooter, Form, Container} from 'react-bootstrap'
import type { FormEvent } from "react"
import Swal from "sweetalert2"

function AssessmentTab() {
    const [show, setShow] = useState(false)
    const [validated, setValidated] = useState(false)
    const [questions, setQuestions] = useState<any[]>([])

    // on close it resets the questions/modal
    const handleClose = () => {
        setShow(false)
        setQuestions([])
        setValidated(false)
    }
    // Shows the modal
    const handleShow = () => setShow(true)

    const handleAddQuestion = () => {
        // adds new question by getting the current value of questions then adding all the values to a new array with the new question
        setQuestions((prev) => [
        ...prev,
        {
            type: "short-answer",
            text: "",
            options: [],
        },
        ])
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setValidated(true)

        // Just checks validation using HTML5 built in validation
        const form = event.currentTarget
        if (form.checkValidity()) {
        const assessmentName = (
            form.elements.namedItem("courseName") as HTMLInputElement
        ).value

        // Anything below this is temporay for testing
        console.log({
            name: assessmentName,
            questions: questions,
        })

        Swal.fire({
            icon: "success",
            title: "Assessment Created",
            text: `Saved "${assessmentName}" with ${questions.length} question(s).`,
        })

        handleClose()
        }
    }

    return (
        <>
        <Container></Container>
        <Button className="mt-2 me-2" variant="primary" onClick={handleShow}>
            Create Assessment
        </Button>

        <Button className="mt-2 me-2 text-white" variant="warning">
            Edit Assessment
        </Button>

        <Button className="mt-2 me-2" variant="danger">
            Delete Assessment
        </Button>

        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Create Assessment</Modal.Title>
            </Modal.Header>
            <ModalBody>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formCourseName">
                <Form.Label>Assessment Name</Form.Label>
                <Form.Control
                    required
                    placeholder="Ex: Web Dev"
                    type="text"
                    name="courseName"
                />
                <Form.Control.Feedback type="valid">
                    Looks Good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                    Enter Assessment Name
                </Form.Control.Feedback>
                </Form.Group>

                {questions.map((q, index) => (
                    <div key={q.id} className="mb-3 p-3 border rounded bg-light">
                        <Form.Group>
                        <Form.Label>Question {index + 1} Text</Form.Label>
                        <Form.Control
                            type="text"
                            value={q.text}
                            onChange={(e) => {
                            const updated = [...questions]
                            updated[index].text = e.target.value
                            setQuestions(updated)
                            }}
                            placeholder="Enter question"
                            required
                        />
                        </Form.Group>

                        <Form.Group className="mt-2">
                        <Form.Label>Question Type</Form.Label>
                        <Form.Select
                            value={q.type}
                            onChange={(e) => {
                            const updated = [...questions]
                            updated[index].type = e.target.value
                            updated[index].options = []
                            setQuestions(updated)
                            }}
                        >
                            <option value="short-answer">Short Answer</option>
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="likert">Likert</option>
                        </Form.Select>
                        </Form.Group>

                        {q.type === "multiple-choice" && (
                        <Form.Group className="mt-2">
                            <Form.Label>Options (comma-separated)</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="e.g., Red, Green, Blue"
                            onChange={(e) => {
                                const updated = [...questions]
                                updated[index].options = e.target.value
                                .split(",")
                                .map((opt) => opt.trim())
                                setQuestions(updated)
                            }}
                            />
                        </Form.Group>
                        )}

                        {q.type === "likert" && (
                        <Form.Text className="text-muted">
                            This will use default Likert scale: Strongly Disagree →
                            Strongly Agree
                        </Form.Text>
                        )}
                    </div>
                ))}

                <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleAddQuestion}
                >
                Add Question
                </Button>

                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
            </ModalBody>
            <ModalFooter></ModalFooter>
        </Modal>
        </>
    )
}

export default AssessmentTab