import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from "./Scenes/Sign/Login/Login";
import Register from './Scenes/Sign/Registration/Register';
import UserProfile from "./Scenes/User/UserProfile/ShowProfile/UserProfile";
import ForgotPassword from "./Scenes/Sign/ForgotPassword/ForgotPasswordForm";
import ChangeUserPassword from './Scenes/User/ChangeUserPassword/ChangeUserPassword';
import StorageRentAd_List from './Scenes/User/StorageRentAdvertisement/storageRentAd_List';
import EditUserProfile from "./Scenes/User/UserProfile/EditProfile/EditUserProfile";
import StorageRentAd_Full from "./Scenes/User/StorageRentAdvertisement/storageRentAd_Full";
import StorageRentAd_Edit from "./Scenes/User/StorageRentAdvertisement/storageRentAd_Edit";
import StorageRentAd_EditImages from "./Scenes/User/StorageRentAdvertisement/Images/storageRentAd_EditImages";


const Routes = () => (
<BrowserRouter >
    <Switch>
        <Route exact path={"/login"} component={Login}/>
        <Route exact path={"/register"} component={Register}/>
        <Route exact path={"/forgotPassword"} component={ForgotPassword}/>
        <Route exact path={"/:username"} component={UserProfile}/>
        <Route exact path={"/:username/edit"} component={EditUserProfile}/>
        <Route exact path={"/:username/changePassword"} component={ChangeUserPassword}/>
        <Route exact path={"/:username/storageRentAds/:type/:id"} component={StorageRentAd_Full} />
        <Route exact path={"/:username/storageRentAds/:type/:id/editData"} component={StorageRentAd_Edit} />
        <Route exact path={"/:username/storageRentAds/:type/:id/editImages"} component={StorageRentAd_EditImages} />

        <Route exact path={"/:username/storageRentAds/:type"} component={StorageRentAd_List}/>
        <Redirect from="/" to="/login"/>
    </Switch>
</BrowserRouter>
);

export default Routes;