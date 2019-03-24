import React, {Component} from 'react';
import {FormGroup, Label, Button} from 'reactstrap';
import '../signSceneStyles.scss'
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {serverURL} from "../../../Constants";
import {validPhoneNumberRegex} from '../../../ValidationRegex';

const RegistrationTemplate = ({
    values,
    errors,
    touched,
    isSubmitting
}) => (
    <Form>
        <FormGroup>
            <Label for="username">Username</Label>
            <Field type="text" name="username" placeholder="Username"/>
            {touched.username && errors.username && <span>{errors.username}</span>}
        </FormGroup>
        <FormGroup>
            <Label for="password">Password</Label>
            <Field type="password" name="password" placeholder="Password"/>
            {touched.password && errors.password && <span>{errors.password}</span>}
        </FormGroup>
        <FormGroup>
            <Label for="matchPassword">Password</Label>
            <Field type="password" name="matchPassword" placeholder="Confirm password"/>
            {touched.matchPassword && errors.matchPassword && <span>{errors.matchPassword}</span>}
        </FormGroup>
        <FormGroup>
            <Label for="firstName">First name</Label>
            <Field type="text" name="firstName"  placeholder="First name"/>
            {touched.firstName && errors.firstName && <span>{errors.firstName}</span>}
        </FormGroup>
        <FormGroup>
            <Label for="lastName">Last name</Label>
            <Field type="text" name="lastName" placeholder="Last name"/>
            {touched.lastName && errors.lastName && <span>{errors.lastName}</span>}
        </FormGroup>
        <FormGroup>
            <Label for="email">Email</Label>
            <Field type="email" name="email" placeholder="example@gmail.com" />
            {touched.email && errors.email && <span>{errors.email}</span>}
        </FormGroup>
        <FormGroup>
            <Label for="phoneNumber">Phone Number</Label>
            <Field type="text" name="phoneNumber" placeholder="07x/xxx-xxx" />
            {touched.phoneNumber && errors.phoneNumber && <span>{errors.phoneNumber}</span>}
        </FormGroup>
        <FormGroup>
            <Label for="gender">Gender</Label>
            <Field component="select" name="gender" >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
            </Field>
            {touched.gender && errors.gender && <span>{errors.gender}</span>}
        </FormGroup>
        <Button type="submit" disabled={isSubmitting} className="btn btn-default btn-light">Submit</Button>
    </Form>
);

const RegistrationForm = withFormik({
    mapPropsToValues({history, username, password, matchPassword, firstName, lastName, email, phoneNumber, gender}){
        console.log(history);
        return {
            username: username || '',
            password: password || '',
            matchPassword: matchPassword || '',
            firstName: firstName || '',
            lastName: lastName || '',
            email: email || '',
            phoneNumber: phoneNumber || '',
            gender: gender || 'Female'
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().min(6, 'Password has to be longer than 6 characers')
                              .required('Password is required'),
        matchPassword: Yup.string().oneOf([Yup.ref('password')], 'Password does not match')
                                   .required('Confirm password is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Email not valid').required('Email is required'),
        phoneNumber: Yup.string().test('validPhoneNumber',
                                        'Phone number does not have valid format',
                                        function validatePhoneNumber(phoneNumber){
                                            return validPhoneNumberRegex.test(phoneNumber);
                                        })
                                        .required('Phone number is required')
    }),
    handleSubmit(values, {props, resetForm, setSubmitting}) {
        console.log(props);
        console.log(values.gender);
        const {history} = props;
        setSubmitting(true);
        axios.post(`${serverURL}/api/user/register`,{
            username: values.username,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            gender: values.gender
        })
            .then( response => {
                resetForm();
                setSubmitting(false);
                alert('Your profile is successfuly created. Please log in');
                history.push('/login');
            })
            .catch(error => {
                setSubmitting(false);
                alert('Username: ' + values.username + ' already taken. Please try with something else.');
                resetForm();

            })
    }
})(RegistrationTemplate);

export default RegistrationForm;