import React, {Component} from 'react';
import {Label, Button } from 'reactstrap';
import axios from 'axios';
import '../signSceneStyles.scss';
import {serverURL} from "../../../Constants";
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';

const ForgotPasswordForm = ({
    values,
    errors,
    touched,
    isSubmiting
    }) => (
        <Form>
            <div>
                {touched.username && errors.username && <p> {errors.username}</p>}
                <Field type="text" name="username" placeholder="Username" />
            </div>
            <Button disabled={isSubmiting}>Submit</Button>
       </Form>

    );

const ForgotPassword = withFormik({
      mapPropsToValues({username}){
        return {
            username: username || ''
        }
      },
      validationSchema: Yup.object().shape({
        username: Yup.string().required('Username is required')
      }),
      handleSumbit(values, {resetForm, setSubmiting }) {
          setSubmiting(true);
        axios.post(`${serverURL}/api/user/forgotPassword?username=${values.username}`)
            .then( response => {
                const email = response.data;
                alert('Your new password is send to ' + email + '. This email address was found on your user account. After successful login please change it.');
                resetForm();
            })
            .catch( error => {
                alert('StorageAD did not find account with username: '+ values.username + '. Please try again or if you do not have account create now.');
                resetForm();

            });
      }

})(ForgotPasswordForm);

export default ForgotPassword;