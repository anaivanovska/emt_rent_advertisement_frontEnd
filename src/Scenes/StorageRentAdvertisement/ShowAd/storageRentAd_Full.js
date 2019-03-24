import React from 'react';
import withStorageRentAdHOC from '../HOC/storageRentHOC';
import CustomCarousel from "../Images/custom_carousel";
import MapContainer from "../../Map/googleMap";
import {Button} from 'reactstrap';
import axios from '../../../services/AxiosAuthenticatedInstance';
import {serverURL} from "../../../Constants";

const StorageRentAd_Full = (props) => {
    const {id, title, description, status, creationDate, images, storageLocation, publisher} = props.storageRentAd;
    const deleteStorageRendAd = () => {
        axios.delete(`${serverURL}/api/storageRentAd/delete/${id}`)
            .then(response => {
                props.goBack();
            })
            .catch(error => {
                alert('Something went wrong');
            });
    };
    return (
        <div>
            <div className="full-desc-container">
                <div className="card-header">
                    <div>{creationDate}</div>
                    <div className={status === "Open" ? "open-status" : "closed-status"}>{status}</div>
                </div>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <div>{description}</div>
                </div>
                <div className="card-footer">
                    <h3>Images </h3>
                    <div>
                        {images.length > 0 && <CustomCarousel images = {images}/>}
                    </div>
                </div>
                <div className="card-body">
                    <h3>Contact: </h3>
                    <div className="row">
                        <div className="col-sm-4">
                            <i className="fa fa-user"/>
                            <span className="offset-sm-1">{publisher.firstName} {publisher.lastName}</span>
                        </div>
                        <div className="col-sm-4">
                            <i className="fa fa-envelope"/>
                            <span className="offset-sm-1">{publisher.email} </span>
                        </div>
                        <div className="col-sm-4">
                            <i className="fa fa-phone"/>
                            <span className="offset-sm-1">{publisher.phoneNumber} </span>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <h3>Location</h3>
                    <div>
                        {storageLocation && <MapContainer location={storageLocation} />}
                    </div>
                </div>
            </div>
                <Button onClick={() => props.goToRoute('editImages')}> Edit images </Button>
                <Button onClick={() => props.goToRoute('edit')}> Edit advertisement </Button>
            <Button onClick={deleteStorageRendAd} className="btn btn-danger"> Delete X </Button>
            </div>
    )
};

export default withStorageRentAdHOC(StorageRentAd_Full, false);