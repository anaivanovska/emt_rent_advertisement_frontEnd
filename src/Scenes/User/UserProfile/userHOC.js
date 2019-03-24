import React, {Component} from 'react';
import {Container, Button} from 'reactstrap';
import axios from '../../../services/AxiosAuthenticatedInstance';
import {serverURL} from "../../../Constants";
import NavMenu from '../../Menu/NavMenu';
import "../userComponentsStyles.scss";

const userHOC=(WrappedComponent, showProfile) => {
    return (
        class extends Component {
            state = {
                userData: {},
            };

            fetchUserData = () => {
                const username = this.props.match.params.username;
                    axios.get(`${serverURL}/api/user/get/${username}`)
                        .then(response => {
                            console.log(response.data);
                            const userData = response.data;
                            this.setState({
                                userData: userData
                            });
                        })
                        .catch(error => {
                            console.log(error);
                    })
            };

            componentDidMount = () => {
                this.fetchUserData();
            };



            goToRoute = (route) => {
                const {history} = this.props;
                const username = this.state.userData.username;
                history.push(`/${username}/${route}`);
            };

            getUserUI() {
                if (showProfile) {
                    return (
                        <div>
                            <WrappedComponent userData = {this.state.userData}/>
                            <div>
                                    <Button className="item-to-left" onClick={() => this.goToRoute('edit')}>Edit</Button>
                                    <Button className="item-to-left" onClick={() => this.goToRoute('storageRentAds/my')}> Show storage rent
                                        ads </Button>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <WrappedComponent {...this.state.userData} goToRoute={this.goToRoute}/>
                        </div>);
                }
            };

            getProfile = () => {
                let profilePicURL;
                const {gender} = this.state.userData;
                if(gender === 'Male') {
                    profilePicURL = "/images/maleProfile.png";
                } else {
                    profilePicURL = "/images/femaleProfile.png";
                }

                return (
                    <div className="profile-backround">
                        <img src={profilePicURL} alt={gender} className="profile-picture"/>
                    </div>);
            };

            render() {
                return (
                    <Container className="defaultFont">
                        <NavMenu history={this.props.history}/>
                        <div className="offset-2 row margin-top">
                            <div className="col-sm-3"> {this.getProfile()} </div>
                            <div className="col-sm"> {this.getUserUI()} </div>
                        </div>
                    </Container>
                );
            }
        }
   );

};

export default userHOC;