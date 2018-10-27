import  React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import '../signSceneStyles.scss';
import axios from 'axios';
import {serverURL} from "../../../Constants";
import TokenService from '../../../services/TokenService';

class LoginForm extends Component{
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

    resetState = ()  => {
        this.setState(this.getInitialState());
    };

    logIn = (event) => {
        event.preventDefault();
        const loginData = this.state;
        const {history} = this.props;
        axios.post(`${serverURL}/login`,
            {
               loginData
            })
            .then(response => {
                TokenService(response);
                this.resetState();
                history.push('/'+ this.state.username + '/profile');
            })
            .catch(error => {
                this.resetState();
                alert('Invalid username or password. Please try again');
            });
    };

    render() {
        const {username, password} = this.state;
        return (
            <Form className="formSize">
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="username" placeholder="username" value={username} onChange={event =>  this.inputChangeHandler(event)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="password" value={password} onChange={event =>  this.inputChangeHandler(event)}/>
                </FormGroup>
                <Button outline className="btn btn-secondary" type="submit" onClick={event => this.logIn(event)}>Log in </Button>
            </Form>
        );
    }

}

export default LoginForm;