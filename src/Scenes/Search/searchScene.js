import React, {Component} from 'react';
import SearchComponent from './searchComponent';
import axios from '../../services/AxiosAuthenticatedInstance';
import {serverURL} from "../../Constants";
import StorageRentAd_List from "../StorageRentAdvertisement/ShowAd/storageRentAd_List";
import NavMenu from "../Menu/NavMenu";

class Search extends Component {
    state={
        storageRentAds: [],
        totalItemsCount: 0
    };


    handleOnSearch = (keyword) => {
        const {username, type} = this.props.match.params;
        const shouldSearchByUsername = type === "my" ? true : false;
        axios.get(`${serverURL}/api/search/${username}/${shouldSearchByUsername}`,{
            params: {
                keyword: keyword
            }
            })
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
            });
    };


    render() {
        const {storageRentAds} = this.state;
        const {type} = this.props.match.params;
        return (
                <div>
                    <NavMenu history={this.props.history}/>
                    <div className="offset-3 margin-top">
                        <SearchComponent handleOnSearch={this.handleOnSearch} selectedSearchType = {type} />
                        <div>
                            {Array.isArray(storageRentAds) && storageRentAds.length !== 0 && <StorageRentAd_List {...this.state} {...this.props}/> }
                        </div>
                    </div>
                </div>
        )
    }
}

export default Search;