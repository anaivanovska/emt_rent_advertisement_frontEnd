import React from 'react';
import LoginForm from '../components/LoginForm';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

const Login = (props) => {
    const goToRegister = () => {
        const {history} = props;
        history.push('/register')
    };
    return (
        <div>
            <LoginForm history={props.history}/>
            <Button className="btn btn-primary" onClick={goToRegister}>Sign up </Button><span>for free.</span>
            <br/>
            <Link to='/forgotPassword'>Forgot password ? </Link>
        </div>
    );
};
export default Login;