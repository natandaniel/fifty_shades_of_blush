import React from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import LoginPage from './views/LoginPage/LoginPage.jsx';
import LandingPage from './views/LandingPage/LandingPage.jsx';
import BFTLPage from './views/BFTLPage/BFTLPage.jsx';
import CreateArticle from './components/article/CreateArticle.jsx';
import EditArticle from './components/article/EditArticle.jsx';

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
                    <Route path="/beauty" render={(props) => <BFTLPage {...props} page={"beauty"} />} />
                    <Route path="/fashion" render={(props) => <BFTLPage {...props} page={"fashion"} />} />
                    <Route path="/travel" render={(props) => <BFTLPage {...props} page={"travel"} />} />
                    <Route path="/lifestyle" render={(props) => <BFTLPage {...props} page={"lifestyle"} />} />
                    <Route exact path="/login" component={LoginPage} />
                    <PrivateRoute exact path="/admin/create" component={CreateArticle} />
                    <PrivateRoute exact path="/admin/edit" component={EditArticle} />
                </Switch>
            </Router>
        );
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        sessionStorage.getItem('isAuth') === 'true'
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
)

export default App;