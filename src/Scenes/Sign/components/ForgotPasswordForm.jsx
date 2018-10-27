import React, {Component} from 'react';
import {Form, FormGroup, Input, Label, Button } from 'reactstrap';
import axios from 'axios';
import '../signSceneStyles.scss';
import {serverURL} from "../../../Constants";

class ForgotPasswordForm extends Component {
    state = this.getInitialState();

    getInitialState = () => {
        const initialState = {
            username: '',
            password: ''
        };
        return initialState;
    };

    inputChangeHandler = event => {
        const key = event.target.name;
        const value = event.target.value;
        this.setState({
            [key]: value
        });
    };

    forgotPasswordHandler = event => {
        event.preventDefault();
        const forgotPasswordFormData = this.state;
        axios.post(`${serverURL}/forgotPassword`,
            {
                forgotPasswordFormData
            })
            .then( response => {
                alert('Your new password is send to ' + this.state.email + '. After successful login please change it.');
                this.resetState();
            })
            .catch( error => {
                this.resetState();
                alert(error.message);
            });
    };

    resetState = () => {
        this.setState(this.getInitialState());
    };

    render() {
        const {username, email } = this.state;

        return (
            <Form className="formSize">
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="username" placeholder="username" value={username} onChange={event => this.inputChangeHandler(event)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="example@gmail.com" value={email} onChange={event => this.inputChangeHandler(event)}/>
                </FormGroup>
                <Button type="submit" onClick = {event => this.forgotPasswordHandler(event)}  className="btn btn-default btn-primary"> Submit </Button>
            </Form>
        )
    }
}

export default ForgotPasswordForm;