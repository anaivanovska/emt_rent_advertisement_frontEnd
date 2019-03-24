import React, {Component} from 'react';
import './sideBarMenu.scss';
import 'font-awesome/css/font-awesome.min.css';
import {Link} from 'react-router-dom';
import TokenService from '../../../services/TokenService';
import {Nav, NavItem, Collapse} from 'reactstrap';

class SideBarMenu extends Component {
    state = {
        isSearchSelected: false,
        isAdvertisementSelected: false
    };

    handleNavItemClicked = (selectedNavItem) => {
        if(selectedNavItem === "search") {
            this.setState((previousState) => {
                return  {
                    isSearchSelected: !previousState.isSearchSelected
                }
            })
        } else if(selectedNavItem === "advertisement") {
            this.setState((previousState) => {
                return {
                    isAdvertisementSelected: !previousState.isAdvertisementSelected
                }
            })
        }
    };
    signOut = () => {
        TokenService(false);
    };

   render() {
       const {username} = this.props;
       return (
           <div className="sidenav">
               <img src="/images/warehouse.png"/>
               <span className="logo-font"> Storage Rent</span>
               <Nav vertical className="top-margin">
                   <NavItem className="sidenav-item">
                       <Link to={`/${username}`} className="sidenav-link">
                           <i className="fa fa-user-circle-o"> My Profile </i>
                       </Link>
                   </NavItem>
                   <NavItem className="sidenav-item">
                       <div className="sidenav-link" onClick={() => this.handleNavItemClicked("advertisement")}>
                           <i className="fa fa-book"> Advertisement </i>
                       </div>
                       <Collapse isOpen={this.state.isAdvertisementSelected}>
                           <NavItem className="sidenav-subitem">
                               <Link to={`/${username}/storageRentAds/my/createNew/ad`} className="sidenav-sublink">
                                    Create new ad
                               </Link>
                           </NavItem>
                           <NavItem className="sidenav-subitem">
                               <Link to={`/${username}/storageRentAds/my`} className="sidenav-sublink">
                                   Show my ads
                               </Link>
                           </NavItem>
                       </Collapse>
                   </NavItem>
                   <NavItem className="sidenav-item">
                       <div className="sidenav-link" onClick={() => this.handleNavItemClicked("search")}>
                           <i className="fa fa-search"> Search </i>
                       </div>
                       <Collapse isOpen={this.state.isSearchSelected}>
                           <NavItem className="sidenav-subitem">
                               <Link to={`/${username}/search/my`} className="sidenav-sublink">
                                   <i className="fa fa-user"> My Storage Ads </i>
                               </Link>
                           </NavItem>
                           <NavItem className="sidenav-subitem">
                               <Link to={`/${username}/search/all`} className="sidenav-sublink">
                                   <i className="fa fa-users"> Other Storage Ads </i>
                               </Link>
                           </NavItem>
                       </Collapse>
                   </NavItem>
                   <NavItem className="sidenav-item">
                       <Link to={`/${username}/changePassword`} className="sidenav-link">
                           <i className="fa fa-pencil"> Change password </i>
                       </Link>
                   </NavItem>
                   <NavItem className="sidenav-item" onClick={this.signOut}>
                       <Link to="/login" className="sidenav-link">
                           <i className="fa fa-sign-out">Sing out </i>
                       </Link>
                   </NavItem>
               </Nav>
           </div>

       );

   }
};

export default SideBarMenu;