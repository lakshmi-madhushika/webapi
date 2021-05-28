import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

export class Addcandi extends Component {

    constructor(props) {
        super(props);
        this.state = { cands: []};//this.state = {value: 'coconut'};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlefileselected = this.handlefileselected.bind(this);
        
    }
    photofilename = "anonymous.jpg";
    imagesrc = process.env.REACT_APP_PHOTOPATH + this.photofilename;

   

   

    handleSubmit(event) {
        //alert('Your sex is: ' + event.target.sex.value);
        if (event.target.sex.value === "select option") {
            alert('sex is not selected ');
            event.preventDefault();
        } else {

            
           // var list = this.state.cands.map(cand => (<li key={cand.id}>{cand.mobile}</li>));
           
                event.preventDefault();
                fetch(process.env.REACT_APP_API + 'candidate', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullname: event.target.fullname.value,
                        email: event.target.email.value,
                        address: event.target.address.value,
                        age: event.target.age.value,
                        mobile: event.target.mobile.value,
                        bloodgroup: event.target.bloodgroup.value,
                        sex: event.target.sex.value,
                        photofilename: this.photofilename
                    })
                })
                    .then(response => response.json())
                    .then(result => {
                        alert(result);
                    }, (error) => {
                        alert("failed");
                    });
                     
          
        }
       
    }

    handlefileselected(event) {
        event.preventDefault();
        this.photofilename = event.target.files[0].name;
        const formdata = new FormData();
        formdata.append(
            "myfile",
            event.target.files[0],
            event.target.files[0].name
        );
        fetch(process.env.REACT_APP_API + "candidate/Savefile", {
            method: 'POST',
            body: formdata
        })
            .then(response => response.json())
            .then((result) => {
                this.imagesrc = process.env.REACT_APP_PHOTOPATH + result;

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
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    
                                    <Form.Group controlId="fullname">
                                        <Form.Label>fullname</Form.Label>
                                        <Form.Control type="text" name="fullname" required autoComplete="off" placeholder="fullname"/>
                                    </Form.Group>
                                    <Form.Group controlId="address">
                                        <Form.Label>address</Form.Label>
                                        <Form.Control type="text" name="address" required autoComplete="off" placeholder="address" />
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Label>email</Form.Label>
                                        <Form.Control type="text" name="email" required autoComplete="off" placeholder="email" />
                                    </Form.Group>

                                    <Row>
                                        <Col sm={6}>
                                            <Form.Group controlId="sex">                                        
                                                <Form.Label>sex</Form.Label>
                                                <Form.Control as="select">
                                                    <option>select option</option>
                                                    <option>male</option>
                                                    <option>female</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="mobile">
                                                <Form.Label>mobile</Form.Label>
                                                <Form.Control type="text" name="mobile" required autoComplete="off" placeholder="mobile" />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={6}> 
                                            <Form.Group controlId="age">
                                                <Form.Label>age</Form.Label>
                                                <Form.Control type="text" name="age" required autoComplete="off" placeholder="age" />
                                            </Form.Group>
                                            <Form.Group controlId="bloodgroup">
                                                <Form.Label>blood group</Form.Label>
                                                <Form.Control type="text" name="bloodgroup" required autoComplete="off" placeholder="blood group" />
                                            </Form.Group>
                                         </Col >
                                    </Row>
                                    <Form.Group >
                                        <Button variant="primary" type="submit">
                                            Add Employee
                                        </Button>
                                    </Form.Group>
                                    
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Image width="200px" height="200px" src={this.imagesrc} />
                                <input onChange={this.handlefileselected} type="File" />
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