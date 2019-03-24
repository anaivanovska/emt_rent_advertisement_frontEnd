import React, {Component} from 'react';
import axios from '../../../services/AxiosAuthenticatedInstance';
import {DEFAULT_ACTIVE_PAGE, serverURL} from "../../../Constants";
import NavMenu from "../../Menu/NavMenu";
import StorageRentAd_List from "./storageRentAd_List";


class StorageRentAds_ListScene extends Component {
    state = {
        storageRentAds: [],
        totalItemsCount: 0
    };


    fetchStorageRentAdItems = (activePage) => {
        const username = this.props.match.params.username;
        axios.get(`${serverURL}/api/storageRentAd/all/${username}?page=${activePage-1}`)
            .then(response => {
                const storageRentAds = response.data.content;
                const totalItemsCount = response.data.totalElements;
                this.setState({
                    storageRentAds,
                    totalItemsCount
                });
            })
            .catch(error => {
                console.log(error);
            })

    };

    componentDidMount= () => {
       this.fetchStorageRentAdItems(DEFAULT_ACTIVE_PAGE);
    };


    render() {
        const {storageRentAds} = this.state;
        return(
            <div>
                <NavMenu history={this.props.history}/>
                <div className="offset-3 margin-top">
                    {Array.isArray(storageRentAds) && storageRentAds.length !== 0 && <StorageRentAd_List {...this.state} {...this.props} />}
                </div>
            </div> )

    }
}

export default StorageRentAds_ListScene;