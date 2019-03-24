import React from 'react';
import {Container, Col, FormGroup, Label, Button} from 'reactstrap';
import PropTypes from 'prop-types';
import '../storageRentAdStyle.scss';

const StorageRentAd_Short = (props) => {
    const {id, title, description, creationDate, status, storageLocation, images} = props.storageRentAdData;
    const goToStorageRentAd_Full = () => {
        props.handleOnClick();
    };
    const getImage = () => {
        const imageBytes = images[0] ? images[0].image : null;
        if(imageBytes){
            return <img className="card-img-top" src={`data:image/png;base64,${imageBytes}`} alt={title} />
        } else {
            return <img className="card-img-top" src="/images/emptyImage.png" alt={title} />
        }
    };
    return (
        <div className="short-desc-container" onClick={goToStorageRentAd_Full}>
            <div className="card-header">
                    <div>Date: {creationDate}</div>
                    <div className={status === "Open" ? "open-status" : "closed-status"}>Status: {status}</div>
            </div>
            <div className="card-body">
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    {getImage()}
                    <Button > Read More </Button>
                </div>
            </div>
        </div>
    );
};

StorageRentAd_Short.propTypes = {
    storageRentAdData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        creationDate: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        storageLocation: PropTypes.object
    })
};

export default StorageRentAd_Short;