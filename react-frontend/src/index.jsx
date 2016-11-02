// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");
require("../styles/home.scss");

// Render the top-level React component
import React from 'react';
import { render } from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import App from './App.jsx';
import home from './home.jsx'
import findModule from './modules/findModule.jsx'
import settingsPage from './modules/settingsPage.jsx'
import stats from './modules/stats.jsx'

render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={home}/>
        <Route path="/find" component={findModule}/>
        <Route path="/settings" component={settingsPage}/>
        <Route path="/stats" component={stats}/>
      </Route>

    </Router>
  ), document.getElementById('react-root'));
