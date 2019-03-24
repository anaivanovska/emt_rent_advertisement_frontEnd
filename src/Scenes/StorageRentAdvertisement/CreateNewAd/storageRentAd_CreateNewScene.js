import React from 'react';
import NavMenu from "../../Menu/NavMenu";
import StorageRentAd_CreateNewForm from './storageRentAd_CreateNewForm';

const StorageRentAd_CreateNew = (props) =>{
    return (
        <div>
            <NavMenu history = {props.history}/>
            <div className="offset-sm-3 margin-top">
                <StorageRentAd_CreateNewForm {...props}/>
            </div>
        </div>
    )
};

export default StorageRentAd_CreateNew;