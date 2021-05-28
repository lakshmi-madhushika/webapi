import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { Addcandi } from './Addcandi';
import { Editcandi } from './Editcandi';

export class Employees extends Component {

    constructor(props) {
        super(props);
        this.state = { cands: [], addModalShow: false, editdModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'candidate')
            .then(response => response.json())
            .then(data => {
                this.setState({ cands: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentWillUpdate() {
        this.refreshList();
    }
    deleteCandi(id) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'candidate/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }
    render() {
        const { cands, id, age } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <Table className="mt-4 " striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <td>Emp ID</td>
                            <td>Emp Fullname</td>
                            <td>Emp age</td>
                            <td>Emp mobile</td>
                            <td>Emp email</td>
                            <td>Emp Bloodgroup</td>
                            <td>Emp address</td>
                            <td>Emp sex</td>
                            <td>Options</td>
                        </tr>
                    </thead>
                    <tbody>
                        {cands.map(cand =>
                            <tr key={cand.id}>
                                <td>{cand.id}</td>
                                <td>{cand.fullname}</td>
                                <td>{cand.age}</td>
                                <td>{cand.mobile}</td>
                                <td>{cand.email}</td>
                                <td>{cand.bloodgroup}</td>
                                <td>{cand.address}</td>
                                <td>{cand.sex}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant='info'
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                id: cand.id, age: cand.age,
                                                
                                            })}>
                                            Edit</Button> 

                                        <Button className="mr-2" variant='danger'
                                            onClick={() => this.deleteCandi(cand.id)}>
                                            Delete</Button>

                                        <Editcandi show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            id={id}
                                            age={age}
                                            />
                                    </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary' onClick={() => this.setState({ addModalShow: true })}>
                        Add Employee</Button>
                    <Addcandi show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>

            </div>
        )
    }
}