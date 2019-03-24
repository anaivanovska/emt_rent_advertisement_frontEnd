import React from 'react';
import './topBar.scss';
import Search from '../../Search/searchComponent';

const TopBar = ({search, firstName}) => {
    return (
        <div className="dark-container">
            <div className="offset-11 light-text">
                <i className="fa fa-user" />
                <span> Hi, {firstName} </span>
            </div>
        </div>
    )
};

export default TopBar;