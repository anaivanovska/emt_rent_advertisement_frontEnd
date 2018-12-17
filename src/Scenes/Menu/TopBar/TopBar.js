import React from 'react';
import './topBar.scss';
import Search from './SearchComponent/Search';

const TopBar = ({search, firstName}) => {
    return (
        <div className="dark-container">
            {search===true && <Search/>}
            <div className="offset-sm-11 light-text"> Hi, {firstName} </div>
        </div>
    )
};

export default TopBar;