import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import Drawer from '../components/drawer/Drawer';
import Todo from '../components/todo/Todo';
import Dashboard from '../components/dashboard/Dashboard';

export default () => (
  <Router history={hashHistory}>
    <Route path="/home" component={Drawer}>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/todo" component={Todo} />
    </Route>
    <Redirect from="*" to="/dashboard" />
  </Router>
);
