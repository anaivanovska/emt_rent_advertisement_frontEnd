import React from 'react';
import {withFormik, Form, Field} from 'formik';
import {FormGroup, Label, Button} from 'reactstrap';
import * as Yup from 'yup';
import { serverURL} from "../../../Constants";
import axios from '../../../services/AxiosAuthenticatedInstance';
import withStorageRentAdHOC from './HOC/storageRentHOC';

const EditStorageRentAdTemplate = ({
    values,
    touched,
    errors,
    isSubmitting
}) => (
    <Form>
        <FormGroup>
            <Label> Creation Date </Label>
            <div>{values.creationDate}</div>
        </FormGroup>
        <FormGroup>
            <Label> Status </Label>
            <div>{values.status}</div>
        </FormGroup>
        <FormGroup>
            <Label> Title </Label>
            <Field type="text" name="title" />
            {touched.title && errors.title && <p>{errors.title}</p>}
        </FormGroup>
        <FormGroup>
            <Label> Description </Label>
            <Field component="textarea" name="description" />
            {touched.description && errors.description && <p>{errors.description}</p>}
        </FormGroup>
        <div>Location</div>
        <button disabled={isSubmitting}>Save</button>
    </Form>
);

const StorageRentAd_EditForm = withFormik({
    mapPropsToValues({title, description, creationDate, status, storageLocation}) {
        return {
            title: title || '',
            description: description ||'',
            creationDate: creationDate,
            status: status || false,
            storageLocation: storageLocation || { latitude: 0, longitude: 0}
        }
    },
    validationSchema: Yup.object().shape({

    }),
    handleSubmit(values, {props, resetForm, setSubmitting}){
        setSubmitting(true);
        axios.post(`${serverURL}/api/storageRentAd/update`,
            {
                id: props.id,
                title: values.title,
                description: values.description,
                creationDate: values.creationDate,
                status: values.status,
                storageLocation: props.storageRentAds,
                images: props.images
            })
            .then(response => {
                props.updateStorageRentAd(response.data);
                resetForm();
                setSubmitting(false);
            })
            .catch(error => {
                resetForm();
                setSubmitting(false);
            });
    }
})(EditStorageRentAdTemplate);

const StorageRentAd_Edit = withStorageRentAdHOC(StorageRentAd_EditForm, true);

export default StorageRentAd_Edit;
