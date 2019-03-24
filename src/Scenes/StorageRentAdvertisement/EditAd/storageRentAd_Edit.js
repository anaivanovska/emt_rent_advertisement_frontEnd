import React from 'react';
import {withFormik, Form, Field} from 'formik';
import {FormGroup, Label, Button} from 'reactstrap';
import * as Yup from 'yup';
import { serverURL} from "../../../Constants";
import axios from '../../../services/AxiosAuthenticatedInstance';
import withStorageRentAdHOC from '../HOC/storageRentHOC';
import CustomCarousel from '../Images/custom_carousel';

const EditStorageRentAdTemplate = ({
    values,
    touched,
    errors,
    isSubmitting
}) => (
    <Form>
        <div className="full-desc-container">
            <div className="card-header">
                <div>
                  <i className="fa fa-calendar"/>
                    <span>  {values.creationDate} </span>
                </div>
                <h4>
                    <Field type="checkbox" name="status" checked={values.status}/>
                    <span className={values.status === true ? "open-status" : "closed-status"}>{values.status === true ? 'Open' : 'Closed'}</span>
                </h4>
            </div>
            <div className="card-body">
                <h2 className="card-title">
                    <Field type="text" name="title" />
                    {touched.title && errors.title && <p>{errors.title}</p>}
                </h2>
                <div>
                    <Field component="textarea" name="description" className="full-textarea"/>
                    {touched.description && errors.description && <p>{errors.description}</p>}
                </div>
            </div>
            <div className="card-footer">
                <h3>Images </h3>
                <div>
                    {values.images.length > 0 && <CustomCarousel images = {values.images}/>}
                </div>
            </div>
            <div className="card-body">
                <h3>Contact: </h3>
                <div className="row">
                    <div className="col-sm-4">
                        <i className="fa fa-user"/>
                        <span className="offset-sm-1">{values.publisher.firstName} {values.publisher.lastName}</span>
                    </div>
                    <div className="col-sm-4">
                        <i className="fa fa-envelope"/>
                        <span className="offset-sm-1">{values.publisher.email} </span>
                    </div>
                    <div className="col-sm-4">
                        <i className="fa fa-phone"/>
                        <span className="offset-sm-1">{values.publisher.phoneNumber} </span>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <h3>Location</h3>
                <div className="row">
                    <div className="col-sm-3">
                        <Label>Latitude: </Label>
                        <Field type="text" name="latitude" />
                        {touched.latitude && errors.latitude && <p>{errors.latitude}</p>}
                    </div>
                    <div className="col-sm-3">
                        <Label>Longitude: </Label>
                        <Field type="text" name="longitude" />
                        {touched.longitude && errors.longitude && <p>{errors.longitude}</p>}
                    </div>
                </div>
            </div>
        </div>
        <Button type="submit" disabled={isSubmitting}>Save</Button>
    </Form>
);

const StorageRentAd_EditForm = withFormik({
    mapPropsToValues(props) {
        const {title, description, status, creationDate, images, storageLocation, publisher} = props.storageRentAd;
        return {
        title: title || '',
        description: description ||'',
        creationDate: creationDate,
        status: status === 'Open' ? true : false,
        latitude: storageLocation.latitude || 0,
        longitude: storageLocation.longitude || 0,
        images: images,
        publisher: publisher
    }
},
    validationSchema: Yup.object().shape({

    }),
    handleSubmit(values, {props, resetForm, setSubmitting}){
        setSubmitting(true);
        const newStorageLocation = {
            'latitude': values.latitude,
            'longitude': values.longitude
        };
        axios.put(`${serverURL}/api/storageRentAd/update`,
            {
                id: props.storageRentAd.id,
                title: values.title,
                description: values.description,
                creationDate: values.creationDate,
                status: values.status === true ? 'Open' : 'Closed',
                storageLocation: newStorageLocation,
                images: props.images})
            .then(response => {
                resetForm();
                setSubmitting(false);
                props.goToRoute("");
            })
            .catch(error => {
                resetForm();
                setSubmitting(false);
            });
    }
})(EditStorageRentAdTemplate);

const StorageRentAd_Edit = withStorageRentAdHOC(StorageRentAd_EditForm, true);

export default StorageRentAd_Edit;
