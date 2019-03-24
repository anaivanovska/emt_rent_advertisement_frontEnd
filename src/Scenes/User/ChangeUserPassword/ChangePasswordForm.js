import React from 'react';
import {withFormik, Form, Field} from 'formik';
import {Label, FormGroup, Button, InputGroupAddon, InputGroup, Col, Container} from 'reactstrap';
import * as Yup from 'yup';
import axios from '../../../services/AxiosAuthenticatedInstance';
import {serverURL} from "../../../Constants";


const ChangePasswordTemplate = ({
    values,
    touched,
    errors
}) => (
    <Container className="offset-sm-2 margin-top">
        <Form>
            <Col>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend" className="input-group-prepend-user">Old password</InputGroupAddon>
                        <Field className="lg-width list-group-item-light" type="password" name="password" placeholder="Password"/>
                        {touched.password && errors.password && <p className="text-danger">{errors.password}</p>}
                    </InputGroup>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend" className="input-group-prepend-user">New password</InputGroupAddon>
                        <Field className="lg-width list-group-item-light" type="password" name="newPassword" placeholder="New Password"/>
                        {touched.newPassword && errors.newPassword && <p className="text-danger">{errors.newPassword}</p>}
                    </InputGroup>
                 </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend" className="input-group-prepend-user">Confirm new password</InputGroupAddon>
                        <Field className="lg-width list-group-item-light" type="password" name="matchNewPassword" placeholder="Confirm New Password" />
                        {touched.matchNewPassword && errors.matchNewPassword && <p className="text-danger">{errors.matchNewPassword}</p>}
                    </InputGroup>
                </FormGroup>
            </Col>
            <Col>
                <Button type="submit">Save</Button>
            </Col>
        </Form>
    </Container>

);

const ChangePasswordForm = withFormik({
    mapPropsToValues() {
        return {
            password: '',
            newPassword: '',
            matchNewPassword: ''
        };
    },
    validationSchema: Yup.object().shape({
        password: Yup.string().min(4, 'Please chesk your password again. It Should be longer than 6 char').required('Password is required'),
        newPassword: Yup.string().min(4, 'New Password should be longer than 6 characters').required('New Password is required'),
        matchNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Password does not match new password').required('Confirm new password is required')
    }),
    handleSubmit(values, {props, setSubmitting}) {
        setSubmitting(true);
        const {history, username} = props;

        axios.post(`${serverURL}/api/user/changePassword`, {
            username: username,
            password: values.password,
            newPassword: values.newPassword,
            confirmNewPassword: values.matchNewPassword
        }).then(response => {
            setSubmitting(false);
             history.push('/login')
        }) .catch(error => {
            setSubmitting(false);
            alert('Something went wrong');
        })
    }
})(ChangePasswordTemplate);
export default ChangePasswordForm;