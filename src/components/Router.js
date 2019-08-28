import React from 'react';
import { Switch, Route } from "react-router-dom";
import {Login, Notfound, Home } from './index';

const Router = () => (
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/login" component={Login} />
  <Route component={Notfound} />
</Switch>
)

export default Router;
