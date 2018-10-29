import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

const Register = (props)  => {
    return (
        <div className="formSize">
            <RegistrationForm history = {props.history}/>
            <hr/>
        </div>
    );
};

export default Register;