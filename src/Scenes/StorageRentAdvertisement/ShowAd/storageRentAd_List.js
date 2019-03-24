import React, {Component} from 'react';
import Pagination from 'react-js-pagination';
import {DEFAULT_ACTIVE_PAGE, DEFAULT_ITEMS_PER_PAGE, serverURL} from "../../../Constants";
import StorageRentAd_Short from './storageRentAd_Short';
import '../storageRentAdStyle.scss';

class StorageRentAd_List extends Component {
    constructor(props){
        super(props);
        this.state = {
            activePage: DEFAULT_ACTIVE_PAGE
        };
    }

    handlePageChange = (pageNumber) => {
        if( this.state.activePage !== pageNumber) {
            this.setState({
                activePage: pageNumber
                },
                () => this.props.fetchStorageRentAdItems(this.state.activePage)
            )
        }
    };

    goToStorageRentAd_Full = (id) => {
        const {history} = this.props;
        const {username, type} = this.props.match.params;
        history.push(`/${username}/storageRentAds/${type}/${id}`)
    };
    render() {
        const { activePage } = this.state;
        const { storageRentAds, totalItemsCount} = this.props;
        console.log('Render in storage Rent ads: ');
        console.log(storageRentAds);
        return(
          <div>
                  <div>
                      {
                      storageRentAds.map(storageRentAd => <StorageRentAd_Short storageRentAdData = {storageRentAd} handleOnClick = {() => this.goToStorageRentAd_Full(storageRentAd.id)} key={storageRentAd.id} />)
                      }
                  </div>
                  <Pagination
                    innerClass="custom-pagination"
                    activePage={activePage}
                    onChange={this.handlePageChange}
                    totalItemsCount={totalItemsCount}
                    itemsCountPerPage={DEFAULT_ITEMS_PER_PAGE}
                  />
        </div> )

    }
}

export default StorageRentAd_List;