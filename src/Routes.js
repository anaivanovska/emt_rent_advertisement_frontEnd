import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from "./Scenes/Sign/Login/Login";
import Register from './Scenes/Sign/Registration/Register';
import UserProfile from "./Scenes/User/UserProfile/ShowProfile/UserProfile";
import EditUserProfile from "./Scenes/User/UserProfile/EditProfile/EditUserProfile";
import ForgotPassword from "./Scenes/Sign/ForgotPassword/ForgotPassword";
import ChangeUserPassword from './Scenes/User/ChangeUserPassword/ChangeUserPassword';
import StorageRentAds_ListScene from './Scenes/StorageRentAdvertisement/ShowAd/storageRentAds_ListScene';
import StorageRentAd_Full from "./Scenes/StorageRentAdvertisement/ShowAd/storageRentAd_Full";
import StorageRentAd_Edit from "./Scenes/StorageRentAdvertisement/EditAd/storageRentAd_Edit";
import StorageRentAd_EditImages from "./Scenes/StorageRentAdvertisement/Images/storageRentAd_EditImages";
import StorageRentAd_CreateNew from "./Scenes/StorageRentAdvertisement/CreateNewAd/storageRentAd_CreateNewScene";
import Search from "./Scenes/Search/searchScene";

const Routes = () => (
<BrowserRouter >
    <Switch>
        <Route exact path={"/login"} component={Login}/>
        <Route exact path={"/register"} component={Register}/>
        <Route exact path={"/forgotPassword"} component={ForgotPassword}/>
        <Route exact path={"/:username"} component={UserProfile}/>
        <Route exact path={"/:username/edit"} component={EditUserProfile}/>
        <Route exact path={"/:username/search/:type"} component={Search}/>
        <Route exact path={"/:username/changePassword"} component={ChangeUserPassword}/>
        <Route exact path={"/:username/storageRentAds/:type/:id"} component={StorageRentAd_Full} />
        <Route exact path={"/:username/storageRentAds/:type/:id/edit"} component={StorageRentAd_Edit} />
        <Route exact path={"/:username/storageRentAds/:type/:id/editImages"} component={StorageRentAd_EditImages} />
        <Route exact path={"/:username/storageRentAds/:type/createNew/ad"} component={StorageRentAd_CreateNew}/>
        <Route exact path={"/:username/storageRentAds/:type"} component={StorageRentAds_ListScene}/>
        <Redirect from="/" to="/login"/>
    </Switch>
</BrowserRouter>
);

export default Routes;