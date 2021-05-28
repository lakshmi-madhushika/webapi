import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class Editcandi extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'candidate', {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: event.target.id.value,
                age: event.target.age.value,
                
            })
        })
            .then(response => response.json())
            .then(result => {
                alert(result);
            }, (error) => {
                alert("failed");
            });
    }


    render() {

        return (
            <div className="container" >
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-model-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-model-title-vcenter">
                            Edit Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="id">
                                        <Form.Label>id</Form.Label>
                                        <Form.Control type="text" name="id" required
                                            disabled defaultValue={this.props.id} placeholder="id" />
                                    </Form.Group>
                                    <Form.Group controlId="age">
                                        <Form.Label>age</Form.Label>
                                        <Form.Control type="text" name="age" required
                                            defaultValue={this.props.age} placeholder="age" />
                                    </Form.Group>
                                  
                                    <Form.Group >
                                        <Button variant="primary" type="submit">
                                            update employee
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}