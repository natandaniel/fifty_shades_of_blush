import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";


import * as serviceWorker from './serviceWorker';

import LoginPage from './views/LoginPage/LoginPage.jsx';
import LandingPage from './views/LandingPage/LandingPage.jsx';
import AdminPage from "./views/AdminPage/AdminPage.jsx";
import BeautyPage from './views/BeautyPage/BeautyPage.jsx';
import FashionPage from './views/FashionPage/FashionPage.jsx';
import TravelPage from './views/TravelPage/TravelPage.jsx';
import LifestylePage from './views/LifestylePage/LifestylePage.jsx';


import './index.css';

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/admin" component={AdminPage} />
        <Route path="/beauty" component={BeautyPage} />
        <Route path="/fashion" component={FashionPage} />
        <Route path="/travel" component={TravelPage} />
        <Route path="/lifestyle" component={LifestylePage} />
      </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
