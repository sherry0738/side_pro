import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './containers/Home';
import GuestPage from './containers/GuestPage';
import Quizzes from './components/Quizzes';
import User from './components/User';
import Add from './components/Add';
import NotFound from './containers/NotFound';
import AppliedRoute from './components/AppliedRoute';

export default ({childProps}) => (
  <Switch>
    <AppliedRoute path="/" exact component={GuestPage} props={childProps} />
    <AppliedRoute path="/home" exact component={Home} props={childProps} />
    <AppliedRoute path="/quiz/1" exact component={Quizzes} props={childProps} />
    <AppliedRoute path="/user" exact component={User} props={childProps} />
    <AppliedRoute path="/add" exact component={Add} props={childProps} />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
