import React, {Component} from 'react';
import Pagination from 'react-js-pagination';
import {serverURL} from "../../../Constants";
import axios from '../../../services/AxiosAuthenticatedInstance';
import StorageRentAd_Short from './storageRentAd_Short';
import './storageRentAdStyle.scss';
import NavMenu from "../../Menu/NavMenu";
class StorageRentAd_List extends Component {
    state = {
        storageRentAds: [],
        totalItemsCount: 0,
        activePage: 1,
        itemsCountPerPage: 10
    };

    fetchStorageRentAdItems = () => {
        const username = this.props.match.params.username;
        axios.get(`${serverURL}/api/storageRentAd/all/dean?page=${this.state.activePage-1}`)
            .then(response => {
                const storageRentAds = response.data.content;
                const totalItemsCount = response.data.totalElements;
                this.setState({
                    storageRentAds,
                    totalItemsCount
                })
            })
            .catch(error => {
                console.log(error);
            })

    };

    componentDidMount= () => {
        this.fetchStorageRentAdItems();
    };


    handlePageChange = (pageNumber) => {
        if( this.state.activePage !== pageNumber) {
            this.setState({
                activePage: pageNumber
                },
                () => this.fetchStorageRentAdItems()
            )
        }
    };

    goToStorageRentAd_Full = (id) => {
        const {history} = this.props;
        const {username, type} = this.props.match.params;
        history.push(`/${username}/storageRentAds/${type}/${id}`)
    };
    render() {
        console.log(this.props.match.url);

        return(
          <div>
              <NavMenu history={this.props.history}/>
              <div className="offset-3">
                  <div>
                      {
                       this.state.storageRentAds.map(storageRentAd => <StorageRentAd_Short storageRentAdData = {storageRentAd} handleOnClick = {() => this.goToStorageRentAd_Full(storageRentAd.id)} key={storageRentAd.id} />)
                      }
                  </div>
                  <Pagination
                    innerClass="custom-pagination"
                    activePage={this.state.activePage}
                    onChange={this.handlePageChange}
                    totalItemsCount={this.state.totalItemsCount}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                  />
              </div>
        </div> )

    }
}

export default StorageRentAd_List;