import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../containers/Home'
import Contact from '../containers/Contact' 
const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/contact' component={Contact} />
      {/* <Route exact path='/login' component={Login} />
      <Route exact path='/form' component={UserForm} />
      <Route component={NotFound} /> */}
    </Switch>
  </Router>
);

export default App;

