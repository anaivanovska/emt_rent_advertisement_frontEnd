import React from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import {Button} from 'reactstrap';
const ForgotPassword = (props)  => {
    const handleRouteChange = route => {
        const {history} = props;
        history.push(route);
    };
    return (
        <div className="formSize">
            <div> Please enter your username to search your account and valid email to inform your new password </div>
            <ForgotPasswordForm history={props.history}/>
            <hr/>
            <Button outline className="btn btn-primary" onClick={() => handleRouteChange('/login')}>Log in </Button>
            <Button outline  className="btn btn-secondary" onClick={() => handleRouteChange('/register')}>Sing up </Button>
        </div>
    );
};

export default ForgotPassword;