import React, {Component} from 'react';
import {Form, FormGroup, Input, Label, Button } from 'reactstrap';
import axios from 'axios';
import '../signSceneStyles.scss';
import {serverURL} from "../../../Constants";
import ValidationService from "../../../services/ValidationService";

const initialState = {
    username: '',
    errorMessage: ''
};

class ForgotPasswordForm extends Component {
    state = initialState;

    inputChangeHandler = event => {
        const key = event.target.name;
        const value = event.target.value;
        this.setState({
            [key]: value,
            errorMessage: ''
        },
            () => {
             const errorMessage = ValidationService(key, value);
             this.setState({
                 errorMessage: errorMessage
             });
            });
    };

    forgotPasswordHandler = event => {
        event.preventDefault();
        axios.post(`${serverURL}/api/user/forgotPassword?username=${this.state.username}`)
            .then( response => {
                const email = response.data;
                alert('Your new password is send to ' + email + '. This email address was found on your user account. After successful login please change it.');
                this.resetState();
            })
            .catch( error => {
                alert('StorageAD did not find account with username: '+ this.state.username + '. Please try again or if you do not have account create now.');
                this.resetState();

            });
    };

    resetState = () => {
        this.setState(initialState);
    };
    render() {
        const {username, email } = this.state;

        return (
            <Form className="formSize">
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="username" placeholder="username" value={username} onChange={event => this.inputChangeHandler(event)}/>
                </FormGroup>
                <Button type="submit" onClick = {event => this.forgotPasswordHandler(event)}  className="btn btn-default btn-primary"> Submit </Button>
                <div className="error">{this.state.errorMessage} </div>
            </Form>

        )
    }
}

export default ForgotPasswordForm;