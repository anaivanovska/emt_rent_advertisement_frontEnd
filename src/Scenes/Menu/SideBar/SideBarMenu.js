import React from 'react';
import './sideBarMenu.scss';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'font-awesome/css/font-awesome.min.css';
import {Link} from 'react-router-dom';
import TokenService from '../../../services/TokenService';

const SideBarMenu = ({username}) => {
    const signOut = () => {
        TokenService(false);
    };
    return (
                <div className="sidenav">
                    <img src="/images/warehouse.png"/>
                    <span className="logo-font"> Storage Rent</span>

                    <div className="top-margin">
                        <div className="sidenav-item">
                            <Link to={`/${username}`} className="sidenav-link">
                                <i className="fa fa-user-circle-o"> My Profile </i>
                            </Link>
                        </div>
                        <div className="sidenav-item">
                            <Link to={`/${username}/search`} className="sidenav-link">
                                <i className="fa fa-search"> Search </i>
                            </Link>
                        </div>
                        <div className="sidenav-item">
                            <Link to={`/${username}/changePassword`} className="sidenav-link">
                                <i className="fa fa-pencil"> Change password </i>
                            </Link>
                        </div>
                        <div className="sidenav-item" onClick={signOut}>
                            <Link to="/login" className="sidenav-link">
                                <i className="fa fa-sign-out">Sing out </i>
                            </Link>
                        </div>
                    </div>
                </div>

    );
};

export default SideBarMenu;