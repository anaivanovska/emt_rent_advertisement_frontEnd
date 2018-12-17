import React from 'react';
import TopBar from "./TopBar/TopBar";
import SideBarMenu from "./SideBar/SideBarMenu";

const NavMenu = (props) => {

    return (
        <div>
            <TopBar search={true} firstName="Dean"/>
            <SideBarMenu username="dean"/>
        </div>
    )
};

export default NavMenu;