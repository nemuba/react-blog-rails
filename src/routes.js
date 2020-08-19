import React from "react";
import {BrowserRouter,Switch, Route, Redirect} from "react-router-dom";


import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Logout from './pages/Logout';
import Account from './pages/Account';
import Reading from './pages/Reading';
import PostNew from './pages/Posts/New';
import PostEdit from './pages/Posts/Edit';

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />  
      ) : (
        <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () =>{
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/logout" exact component={Logout} />
        <PrivateRoute path="/post/new" exact component={PostNew} />
        <PrivateRoute path="/post/:id/edit" exact component={PostEdit} />
        <Route path="/post/:id" exact component={Reading} />
        <PrivateRoute path="/profile" exact component={Account} />
        <PrivateRoute path="/app" exact component={()=> <h2>Hello</h2>} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;