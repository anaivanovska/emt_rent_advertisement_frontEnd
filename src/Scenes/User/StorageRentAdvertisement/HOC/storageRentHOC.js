import React, {Component} from 'react';
import {serverURL} from "../../../../Constants";
import axios from '../../../../services/AxiosAuthenticatedInstance';
import NavMenu from "../../../Menu/NavMenu";

const withStorageRentHOC = (WrappedComponent, showEditAdForm) => {
    return (
        class extends Component {
            state = {
                storageRentAd: {}
            };

            fetchStorageRentAd = () => {
                const storageRentAdID = this.props.match.params.id;
                axios.get(`${serverURL}/api/storageRentAd/full/${storageRentAdID}`)
                    .then(response => {
                        console.log(response.data);
                        const storageRentAd = response.data;
                        this.setState({
                            storageRentAd
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        alert('Something went wrong ...');
                    })
            };

            componentDidMount = () => {
                this.fetchStorageRentAd();
            };

            getUI = () => {
                const {storageRentAd} = this.state;
                if(!storageRentAd.hasOwnProperty('title')){
                    return ;
                } else {
                    return <WrappedComponent storageRentAd={this.state.storageRentAd} goToRoute={this.goToRoute}/>;
                }
            };

            goToRoute = (route) => {
                const {username, type, id} = this.props.match.params;
                const {history} = this.props;
                history.push(`/${username}/storageRentAds/${type}/${id}/${route}`);
            };

            render() {
                return (
                    <div>
                        <NavMenu history={this.props.history}/>
                        <div className="offset-sm-3 margin-top">
                            {this.getUI()}
                        </div>
                    </div>
                )
            }
        }
    );
};

export default withStorageRentHOC;
