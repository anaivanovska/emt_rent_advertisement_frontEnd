import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import '../signSceneStyles.scss';
import axios from 'axios';
import {serverURL} from "../../../Constants";
import ValidationService from "../../../services/ValidationService";

const initialState = {
    username: '',
    password: '',
    matchPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: 'None',
    errorMessage: ''
};

class RegistrationForm extends Component {
    state = initialState;

    inputChangeHandler = event => {
        const key = event.target.name;
        const value = event.target.value;
        this.setState({
            [key]: value,
            errorMessage: ''
        },
            () => {
                const errorMessage = key === 'matchPassword' ?
                    ValidationService(key, value, this.state.password) : ValidationService(key, value);
                this.setState({
                    errorMessage: errorMessage
                });
            });
    };

    register = event => {
        event.preventDefault();
        const {history} = this.props;
        axios.post(`${serverURL}/api/user/register`,{
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender
            })
            .then( response => {
                this.resetState();
                alert('Your profile is successfuly created. Please log in');
                history.push('/login');
            })
            .catch(error => {
                alert('Username: ' + this.state.username + ' already taken. Please try with something else.');
                this.resetState();
            })

    };

    resetState = () => {
        this.setState(initialState);
    };

    render() {
        const {username, password, matchPassword, firstName, lastName, email, phoneNumber, gender} = this.state;
        return (
            <Form>
            <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" placeholder="username" value={username} onChange={event =>  this.inputChangeHandler(event)}/>
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="password" value={password} onChange={event =>  this.inputChangeHandler(event)}/>
            </FormGroup>
            <FormGroup>
                <Label for="matchPassword">Password</Label>
                <Input type="password" name="matchPassword" id="matchPassword" placeholder="confirm password" value={matchPassword} onChange={event =>  this.inputChangeHandler(event)}/>
            </FormGroup>
            <FormGroup>
                <Label for="firstName">First name</Label>
                <Input type="text" name="firstName" id="firstName" placeholder="firstName" value={firstName} onChange={event =>  this.inputChangeHandler(event)}/>
            </FormGroup>
            <FormGroup>
                <Label for="lastName">Last name</Label>
                <Input type="text" name="lastName" id="lastName" placeholder="lastName" value={lastName} onChange={event =>  this.inputChangeHandler(event)}/>
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="example@gmail.com" value={email} onChange={event =>  this.inputChangeHandler(event)}/>
            </FormGroup>
            <FormGroup>
                <Label for="phoneNumber">Phone Number</Label>
                <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="07x/xxx-xxx" value={phoneNumber} onChange={event =>  this.inputChangeHandler(event)}/>
            </FormGroup>
            <FormGroup>
                <Label for="gender">Gender</Label>
                <Input type="select" name="gender" id="gender" value={gender} onChange={event => this.inputChangeHandler(event)}>
                    <option value="None"></option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </Input>
            </FormGroup>
                <Button type="submit" className="btn btn-default btn-primary" onClick={(event) => this.register(event)} > Register </Button>
                <div>{this.state.errorMessage}</div>
        </Form>
        );
    }
}

export default RegistrationForm;