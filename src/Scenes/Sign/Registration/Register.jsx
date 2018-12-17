import React from 'react';
import RegistrationForm from './RegistrationForm';


const Register = (props)  => {
    return (
        <div className="container">
            <RegistrationForm history = {props.history}/>
            <hr/>
        </div>
    );
};

export default Register;