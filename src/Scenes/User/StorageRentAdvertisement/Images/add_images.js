import React, {Component} from 'react';
import {Form, FormGroup, Input, Button} from 'reactstrap';
import {serverURL} from "../../../../Constants";
import axios from '../../../../services/AxiosAuthenticatedInstance';
class Add_Images_Form extends Component {
    state = {
        uploadedImages: []
    };

    handleSave = () => {
        const {rentAdID} = this.props;
        const images = this.getImageList();
        console.log(images);
        axios.post(`${serverURL}/api/image/addAll/${rentAdID}`,
                images,
                { headers: {'Content-Type': 'multipart/form-data' }
            }).then(response => {
                console.log('Response');
                console.log(response);
            }).catch(error => {
                console.log('Error');
                console.log(error);
            });
    };

    getImageList = () => {
        let data = new FormData();
        let images= {};
        const {uploadedImages} = this.state;
        for (var i = 0; i < uploadedImages.length; i++) {
            let image = uploadedImages.item(i);
            data.append('images',image);
        }
        return data;
    };

    handleChange = (event) => {
       const uploadedImages = event.target.files;
        this.setState({
            uploadedImages
        });
    };

    render(){
        return (
            <Form >
                <FormGroup>
                    <Input type="file" multiple onChange={this.handleChange}/>
                </FormGroup>
                <Button onClick={this.handleSave}> Save </Button>
            </Form>
        );
    }
}

export default Add_Images_Form;