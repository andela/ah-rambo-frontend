import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
<<<<<<< HEAD
  Login, NotFound, Home, Signup, ResetPassword, RequestPassword
=======
  Login, NotFound, Home, Signup, ResetPassword, RequestPassword, UserProfile
>>>>>>> feature - [#167190490]:Implement Forgot Password Page (#18)
} from './index';
const Router = () => (
  <Switch>
    <Route path="/signup" component={Signup} />
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/reset-password/" component={ResetPassword} />
    <Route path="/request-password/" component={RequestPassword} />
    <Route path="/profile" component={UserProfile} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
