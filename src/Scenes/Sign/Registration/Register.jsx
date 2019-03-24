import React from 'react';
import RegistrationForm from './RegistrationForm';


const Register = (props)  => {
    return (
        <div className="fullScreen defaultFont background">
            <div className="centeredContainer whiteColor">
                <RegistrationForm history = {props.history}/>
            </div>
        </div>
    );
};

export default Register;