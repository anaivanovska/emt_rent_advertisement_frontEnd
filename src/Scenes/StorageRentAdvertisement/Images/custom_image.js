import React from 'react';
    import {Button} from 'reactstrap';

const StorageRentAdImage = ({id, title, image, handleOnDelete}) => {
    return (
        <div className="col-sm-5 margin-top">
            <img className="img-thumbnail" src={`data:image/png;base64,${image}`} alt={title} />
            <br/>
            <Button className="btn btn-danger" onClick={() => handleOnDelete(id)}> <i className="fa fa-remove" /> Delete</Button>
        </div>
    )
};

export default StorageRentAdImage;