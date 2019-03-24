import React, {Component} from 'react';
import {Form, FormGroup, Input, Button} from 'reactstrap';

class AddImagesForm extends Component {
    state = {
        uploadedImages: []
    };

    handleSave = () => {
        const {rentAdID} = this.props;
        const images = this.getImageList();
        this.getImageList()
            .then((images) => {
            console.log('Images');
                console.log(images);
                this.props.addImages(images);
                console.log('After add images');
                this.setInitialState();
            })
            .catch((error) => alert('Something went wrong while uploading images'));

    };

    setInitialState = () => {
        this.setState({
            uploadedImages: []
        })
    };

    handleChange =  (event) => {
        const uploadedImages = event.target.files;
        this.setState({
            uploadedImages
        });

    };

    getImageList = async () => {
        const {uploadedImages} = this.state;
        return Promise.all([].map.call(uploadedImages, function (image) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.onload = ((file) => {
                    return  (event) => {
                        const imageBuffer = reader.result;
                        const imageBytes = new Uint8Array(imageBuffer);
                        let imageBytes_ = [];
                        for(let i=0; i< imageBytes.length; i++){
                            imageBytes_.push(imageBytes[i]);
                        }
                        const image = {
                            title: file.name,
                            image: imageBytes_
                        };
                        resolve(image);
                    }
                })(image);
                reader.readAsArrayBuffer(image);
            });
        }));
    };



    render(){
        const { uploadedImages } = this.state;
        return (
            <Form >
                <FormGroup>
                    <Input type="file" multiple onChange={this.handleChange}/>
                </FormGroup>
                {uploadedImages.length !==0 && <Button onClick={this.handleSave}> Add Images </Button> }
            </Form>
        );
    }
}

export default AddImagesForm;