import React, {Component} from 'react';
import axios from '../../../../services/AxiosAuthenticatedInstance';
import {Label, FormGroup, Button, InputGroupAddon, InputGroup, Col, InputGroupText, Container } from 'reactstrap';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {validPhoneNumberRegex} from '../../../../ValidationRegex';
import {serverURL} from "../../../../Constants";
import userHOC from '../UserHomeHOC';
import "../../userComponentsStyles.scss";

const EditUserDataTemplate = ({
    values,
    errors,
    touched
}) => {
        return  (
            <Container>
                <Form>
                <Col>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" className="input-group-prepend-user">
                                <InputGroupText> Username: </InputGroupText>
                            </InputGroupAddon>
                            <input value={values.username} readOnly className="lg-width"/>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" className="input-group-prepend-user">First name: </InputGroupAddon>
                            <Field type="text" name="firstName" placeholder="First name" className="lg-width"/>
                            {touched.firstName && errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup className="input-width">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" className="input-group-prepend-user">Last name: </InputGroupAddon>
                            <Field type="text" name="lastName" placeholder="Last name" className="lg-width"/>
                            {touched.lastName && errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" className="input-group-prepend-user">Email: </InputGroupAddon>
                            <Field type="email" name="email" placeholder="example@gmail.com" className="lg-width"/>
                            {touched.email && errors.email && <p className="text-danger">{errors.email}</p>}
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" className="input-group-prepend-user">Phone number: </InputGroupAddon>
                            <Field type="text" name="phoneNumber" placeholder="07x/xxx-xxx" className="lg-width"/>
                            {touched.phoneNumber && errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" className="input-group-prepend-user">Gender: </InputGroupAddon>
                            <Field component="select" name="gender" className="lg-width">
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </Field>
                            {touched.gender && errors.gender && <p className="text-danger">{errors.gender}</p>}
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col>
                    <Button type="submit" className="btn btn-default btn-primary">Save</Button>
                </Col>
              </Form>
            </Container>
      );
    }


const EditUserProfileForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues({username, firstName, lastName, email, phoneNumber, gender}){
        console.log("first");
        const user = {
            username: username || 'ana',
            firstName: firstName || '',
            lastName:  lastName || '',
            email: email || '',
            phoneNumber: phoneNumber || '',
            gender: gender || ''
        };
        console.log(user);
        return user;
    },
    validationSchema: Yup.object().shape({
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
        axios.post(`${serverURL}/api/user/update`,
            {
                username: values.username,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phoneNumber: values.phoneNumber,
                gender: values.gender
            })
            .then((response) => {
                const newUserData = response.data;
                console.log(newUserData.username);
                props.goToRoute('')
            })
            .catch((error) => {
                console.log(error);
            })
    }
})(EditUserDataTemplate);

const EditUserProfile = userHOC(EditUserProfileForm, false);
export default EditUserProfile;