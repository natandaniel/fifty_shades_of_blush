import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';

import Container from '@material-ui/core/Container';
import LandingPage from './views/LandingPage/LandingPage.jsx';
import LoginPage from "./views/LoginPage/LoginPage.jsx";
import BeautyPage from './views/BeautyPage/BeautyPage.jsx';
import FashionPage from './views/FashionPage/FashionPage.jsx';
import TravelPage from './views/TravelPage/TravelPage.jsx';
import LifestylePage from './views/LifestylePage/LifestylePage.jsx';

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Container maxWidth="lg">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/Login" component={LoginPage} />
        <Route path="/Beauty" component={BeautyPage} />
        <Route path="/Fashion" component={FashionPage} />
        <Route path="/Travel" component={TravelPage} />
        <Route path="/Lifestyle" component={LifestylePage} />
      </Switch>
    </Container>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
