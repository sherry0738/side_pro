import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './containers/Home';
import GuestPage from './containers/GuestPage';
import Quizzes from './components/Quizzes';
import NotFound from './containers/NotFound';
import AppliedRoute from './components/AppliedRoute';

export default ({childProps}) => (
  <Switch>
    <AppliedRoute path="/" exact component={GuestPage} props={childProps} />
    <AppliedRoute path="/home" exact component={Home} props={childProps} />
    <AppliedRoute path="/quiz/1" exact component={Quizzes} props={childProps} />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
