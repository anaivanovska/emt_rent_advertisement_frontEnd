import React from 'react';
import {Container, Col, FormGroup, Label} from 'reactstrap';
import PropTypes from 'prop-types';
import userHOC from '../userHOC';

const UserProfileTemplate = (props) => {
    const {username, firstName, lastName, gender, email, phoneNumber} = props.userData;
    return (
        <Container>
            <Col>
                <FormGroup>
                    <Label for="username" className="row-style bold">Username: </Label>
                    <span className="row-style">{username}</span>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="firstName" className="row-style bold">First name: </Label>
                    <span className="row-style">{firstName}</span>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="lastName" className="row-style bold">Last name: </Label>
                    <span className="row-style">{lastName}</span>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="gender" className="row-style bold">Gender: </Label>
                    <span className="row-style">{gender}</span>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="email" className="row-style bold">Email: </Label>
                    <span  className="row-style" >{email}</span>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="phoneNumber" className="row-style bold">Phone number: </Label>
                    <span className="row-style">{phoneNumber}</span>
                </FormGroup>
            </Col>
        </Container>
    )
};

UserProfileTemplate.propTypes = {
    userData: PropTypes.shape({
        username: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        phoneNumber: PropTypes.string,
        gender: PropTypes.string
    })

};

const UserProfile = userHOC(UserProfileTemplate, true);
export default UserProfile;