import React from 'react';
import {Form, Field, withFormik} from 'formik';
import {Button, FormGroup, InputGroup, InputGroupAddon} from 'reactstrap';
import * as Yup from 'yup';
import axios from '../../../services/AxiosAuthenticatedInstance';
import {serverURL} from "../../../Constants";
import AddImagesForm from "../Images/add_images";

const CreateNewStorageRentAdTemplate = ({
    values,
    touched,
    errors,
    isSubmitting,
    setFieldValue
}) => (
    <Form>
        <FormGroup>
            <h4>
                <Field type="checkbox" name="status" checked={values.status}/>
                <span className={values.status === true ? "open-status" : "closed-status"}>{values.status === true ? 'Open' : 'Closed'}</span>
            </h4>
        </FormGroup>
        <FormGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend" className="input-group-prepend-user">Title: </InputGroupAddon>
                <Field type="text" name="title" placeholder="Title" className="lg-width"/>
                {touched.title && errors.title && <p className="text-danger">{errors.title}</p>}
            </InputGroup>
        </FormGroup>
        <FormGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend" className="input-group-prepend-user">Description: </InputGroupAddon>
                <Field type="text" name="description" placeholder="Description..." className="lg-width"/>
                {touched.description && errors.description && <p className="text-danger">{errors.description}</p>}
            </InputGroup>
        </FormGroup>
        <FormGroup>
            <h4>Images</h4>
            <AddImagesForm  name="images" addImages={(images) =>{
                    setFieldValue('images', images);
            }}/>
        </FormGroup>
        <FormGroup>
            <h4> Location </h4>
            <InputGroup>
                <InputGroupAddon addonType="prepend" className="input-group-prepend-user">Latitude: </InputGroupAddon>
                <Field type="text" name="latitude" placeholder="0.00" className="lg-width"/>
                {touched.latitude && errors.latitude && <p className="text-danger">{errors.latitude}</p>}
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend" className="input-group-prepend-user">Longitude: </InputGroupAddon>
                <Field type="text" name="longitude" placeholder="0.00" className="lg-width"/>
                {touched.longitude && errors.longitude && <p className="text-danger">{errors.longitude}</p>}
            </InputGroup>
        </FormGroup>
        <Button type="submit" > Save </Button>
    </Form>
);

const CreateNewStorageRentAdForm = withFormik({
    mapPropsToValues(props){
        return (
            {
                status: true,
                title: '',
                description: '',
                latitude: '',
                longitude: '',
                images: []
            }
        )
    },
    validationSchema: Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        latitude: Yup.number('Latitude must be a valid number').required('Latitude is required'),
        longitude: Yup.number('Longitude must be a valid number').required('Longitude is required')
    }),
    handleSubmit(values, {props,resetForm, setSubmitting}){
        setSubmitting(true);
        const username = props.match.params.username;
        const {history} = props;
        console.log('Submit rentAd');
        console.log( {
            title: values.title,
            description: values.description,
            status: values.status === true ? 'Open' : 'Closed',
            storageLocation: {
                latitude: values.latitude,
                longitude: values.longitude
            },
            images: values.images
        });
        axios.post(`${serverURL}/api/storageRentAd/create/${username}`,
            {
                title: values.title,
                description: values.description,
                status: values.status === true ? 'Open' : 'Closed',
                storageLocation: {
                    latitude: values.latitude,
                    longitude: values.longitude
                },
                images: values.images
            }
        )
            .then(response => {
                setSubmitting(false);
                resetForm();
                const id = response.data.id;
                history.push(`/${username}/storageRentAds/my/${id}`);

            })
            .catch(error => {
                setSubmitting(false);
                resetForm();
                console.log(error);
                alert('Something went wrong');
            });

    }


})(CreateNewStorageRentAdTemplate);

export default CreateNewStorageRentAdForm;