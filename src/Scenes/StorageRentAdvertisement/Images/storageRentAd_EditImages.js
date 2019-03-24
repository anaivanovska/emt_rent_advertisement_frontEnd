import React, {Component} from 'react';
import withStorageRentAdHOC from '../HOC/storageRentHOC';
import StorageRentAdImage from "./custom_image";
import axios from '../../../services/AxiosAuthenticatedInstance';
import {serverURL} from "../../../Constants";
import {Button} from 'reactstrap';
import AddImagesForm from './add_images';

class StorageRentAd_EditImages extends Component {

    state = {
        images: this.props.storageRentAd.images,
        isVisibleAddImagesForm: false
    };

    handleDelete = (id) => {
        axios.delete(`${serverURL}/api/image/delete/${id}`)
            .then(response => {
                this.removeImage(id);
            })
            .catch(error => {
                console.log(error.response.status);
            })
    };

    removeImage = (id) => {
        const {images} = this.state;
        const removedImageIndex = images.findIndex(image => image.id === id);
        images.splice(removedImageIndex, 1);
        this.setState({
            images
        });
    };

    toggleAddImagesForm = () => {
        this.setState((prevState, props) => ({
            isVisibleAddImagesForm: !prevState.isVisibleAddImagesForm
        }));
    };

    addImages = (images) => {
        const storageRentAd_ID = this.props.storageRentAd.id;
        axios.post(`${serverURL}/api/image/addAll/${storageRentAd_ID}`,
            images)
            .then(response => {
                console.log(response);
                const images = response.data;
                this.setState((prevState, props) => ({
                    images,
                    isVisibleAddImagesForm: !prevState.isVisibleAddImagesForm
                }));
            }).catch(error => {
                console.log('Error');
                console.log(error);
        });
    };
    render() {
        const {images} = this.state;
        return (
            <div>
                <div className="row">
                    {
                        images.length &&
                        images.map((image, index) => <StorageRentAdImage key={index} {...image} handleOnDelete={this.handleDelete}/>)
                    }
                </div>
                <Button className="btn btn-dark" onClick={this.toggleAddImagesForm} > {this.state.isVisibleAddImagesForm ? 'Close add new images form' : 'Add new images'}</Button>
                {this.state.isVisibleAddImagesForm && <AddImagesForm addImages = {this.addImages}/>}
            </div>
        );
    }
}

export default withStorageRentAdHOC(StorageRentAd_EditImages);