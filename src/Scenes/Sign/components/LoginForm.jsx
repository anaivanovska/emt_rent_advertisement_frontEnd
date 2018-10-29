import  React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button, Col, Container   } from 'reactstrap';
import '../signSceneStyles.scss';
import axios from 'axios';
import {serverURL} from "../../../Constants";
import TokenService from '../../../services/TokenService';
import ValidationService from '../../../services/ValidationService';

const initialState = {
    username: '',
    password: ''
};
class LoginForm extends Component{
   state = initialState;

    inputChangeHandler = event => {
        const key = event.target.name;
        const value = event.target.value;
        this.setState({
            [key]: value
        });
    };

    resetState = ()  => {
        this.setState(initialState);
    };

    isValidForm = () => {
        ValidationService(this.state);
        return this.state.username !== '' && this.state.password !== '';
    };

    logIn = (event) => {
        event.preventDefault();
        const {history} = this.props;
        axios.post(`${serverURL}/login`,
            {
               username: this.state.username,
               password: this.state.password
            })

            .then(response => {
                console.log(response);
                TokenService(response);
                this.resetState();
                console.log(response);
                history.push('/'+ this.state.username + '/profile');
            })
            .catch(error => {
                console.log(error);
                this.resetState();
                alert('Invalid username or password. Please try again');
            });
    };

    render() {
        const {username, password} = this.state;
        return (
            <Container>
            <Form className="formSize">
                <Col>
                 <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="username" placeholder="username" value={username} onChange={event =>  this.inputChangeHandler(event)}/>
                 </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="password" value={password} onChange={event =>  this.inputChangeHandler(event)}/>
                </FormGroup>
                </Col>
                <Button disabled={!this.isValidForm()} outline className="btn btn-secondary" type="submit" onClick={event => this.logIn(event)}>Log in </Button>
            </Form>
            </Container>

        );
    }

}

export default LoginForm;