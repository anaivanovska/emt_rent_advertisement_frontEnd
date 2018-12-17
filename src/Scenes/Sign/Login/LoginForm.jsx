import  React, {Component} from 'react';
import { FormGroup } from 'reactstrap';
import * as Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import '../signSceneStyles.scss';
import axios from 'axios';
import {serverURL} from "../../../Constants";
import TokenService from '../../../services/TokenService';
import {Button, InputGroup, InputGroupAddon} from 'reactstrap';

const LoginTemplate = ({
    values,
    errors,
    touched,
    isSubmitting
}) => (
    <Form>
        <FormGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend" className="input-group-prepend-login"><i className="fa fa-user" /> </InputGroupAddon>
                <Field type="text" name="username" placeholder="Username" />
                {touched.username && errors.username && <p className="text-danger">{errors.username}</p>}
            </InputGroup>
        </FormGroup>
        <FormGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend" className="input-group-prepend-login"><i className="fa fa-key" /> </InputGroupAddon>
                <Field type="password" name="password" placeholder="password"/>
                {touched.password && errors.password && <p className="text-danger">{errors.password}</p>}
            </InputGroup>
        </FormGroup>
        <Button type="submit" disabled={isSubmitting} className="btn btn-outline-light">Log in</Button>
    </Form>
);

const LoginForm = withFormik({
    mapPropsToValues({username, password}) {
        return {
            username: username || '',
            password: password || ''
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    }),
    handleSubmit(values,{props, resetForm, setSubmitting}) {
        const {history} = props;
        setSubmitting(true);
        axios.post(`${serverURL}/login`,
            {
                username: values.username,
                password: values.password
            })

            .then(response => {
                setSubmitting(false);
                TokenService(response);
                const {username } = values;
                resetForm();
                history.push( '/'+username);
            })
            .catch(error => {
                setSubmitting(false);
                resetForm();
                alert('Invalid username or password. Please try again');
            });
    }
})(LoginTemplate);

export default LoginForm;