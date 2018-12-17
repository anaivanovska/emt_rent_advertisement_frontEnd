import React from 'react';
import LoginForm from './LoginForm';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

const Login = (props) => {
    const goToRegister = () => {
        const {history} = props;
        history.push('/register')
    };
    return (
        <div className="fullScreen defaultFont background">
            <div className="centeredContainer">
                <LoginForm history={props.history}/>
                <br/>
                <Button className="btn btn-light" onClick={goToRegister}>Sign up </Button>
                <br/>
                <Link to='/forgotPassword' className="text-light">Forgot password ? </Link>
            </div>
        </div>
    );
};
export default Login;