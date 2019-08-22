import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import LoginPage from './views/LoginPage/LoginPage.jsx';
import LandingPage from './views/LandingPage/LandingPage.jsx';
import BFTLPage from './views/BFTLPage/BFTLPage.jsx';

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
                    <Route path="/beauty" render={(props) => <BFTLPage {...props} page={"beauty"} />} />
                    <Route path="/fashion" render={(props) => <BFTLPage {...props} page={"fashion"} />} />
                    <Route path="/travel" render={(props) => <BFTLPage {...props} page={"travel"} />} />
                    <Route path="/lifestyle" render={(props) => <BFTLPage {...props} page={"lifestyle"} />} />
                </Switch>
            </Router>
        );
    }
}

export default App;