import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import {Button} from 'reactstrap';
const ForgotPassword = (props)  => {
    const handleRouteChange = route => {
        const {history} = props;
        history.push(route);
    };
    return (
        <div className="fullScreen defaultFont background">
            <div className="centeredContainer whiteColor">
            <div> Please enter your username to search your account and valid email to inform your new password </div>
            <ForgotPasswordForm history={props.history}/>
            </div>
        </div>
    );
};

export default ForgotPassword;