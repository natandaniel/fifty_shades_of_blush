import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import LoginPage from './views/LoginPage/LoginPage.jsx';
import LandingPage from './views/LandingPage/LandingPage.jsx';
import BeautyPage from './views/BeautyPage/BeautyPage.jsx';
import FashionPage from './views/FashionPage/FashionPage.jsx';
import TravelPage from './views/TravelPage/TravelPage.jsx';
import LifestylePage from './views/LifestylePage/LifestylePage.jsx';

var hist = createBrowserHistory();

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { authenticatedUser: {} };
    }
    componentDidMount() {
    }

    render() {

        return (
            <Router history={hist}>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route path="/beauty" component={BeautyPage} />
                    <Route path="/fashion" component={FashionPage} />
                    <Route path="/travel" component={TravelPage} />
                    <Route path="/lifestyle" component={LifestylePage} />
                </Switch>
            </Router>
        );
    }
}

export default App;