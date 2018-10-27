import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from "./Scenes/Sign/scenes/Login";
import Register from './Scenes/Sign/scenes/Register';
import ForgotPassword from './Scenes/Sign/scenes/ForgotPassword';

class App extends Component {
  render() {
    return (
        <div >
          <BrowserRouter >
            <Switch>
              <Route exact path={"/login"} component={Login}/>
              <Route exact path={"/register"} component={Register}/>
              <Route exact path={"/forgotPassword"} component={ForgotPassword}/>
              <Redirect from="/" to="/login"/>
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
