import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, NotFound, Home } from './index';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
