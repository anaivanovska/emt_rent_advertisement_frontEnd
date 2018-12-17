import React, {Component} from 'react';
import withStorageRentAdHOC from '../HOC/storageRentHOC';
import StorageRentAdImage from "./custom_image";
import axios from '../../../../services/AxiosAuthenticatedInstance';
import {serverURL} from "../../../../Constants";
import {Button} from 'reactstrap';
import Add_Images_Form from './add_images';

class StorageRentAd_EditImages extends Component {

    state = {
        images: this.props.storageRentAd.images
    };

    handleDelete = (id) => {
        axios.delete(`${serverURL}/api/image/delete/${id}`)
            .then(response => {
                this.updateState(id);
            })
            .catch(error => {
                console.log(error.response.status);
            })
    };

    updateState = (id) => {
        const {images} = this.state;
        const removedImageIndex = images.findIndex(image => image.id === id);
        images.splice(removedImageIndex, 1);
        this.setState({
            images
        });
    };

    handleSave = (event) => {
        const {id} = this.props.storageRentAd;
        console.log(event);
        //axios.post(`${serverURL}/api/image/addAll/${id}`,)
    }
    render() {
        const {images} = this.state;
        return (
            <div className="row">
                {
                    images.length &&
                    images.map((image, index) => <StorageRentAdImage key={index} {...image} handleOnDelete={this.handleDelete}/>)
                }
                <Button className="btn btn-dark"> Add Images </Button>
                <Add_Images_Form rentAdID={this.props.storageRentAd.id}/>
            </div>
        );
    }
}

export default withStorageRentAdHOC(StorageRentAd_EditImages);