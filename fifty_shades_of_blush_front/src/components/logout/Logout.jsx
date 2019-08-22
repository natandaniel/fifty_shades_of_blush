import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
const API_URL = 'http://localhost:8080/api';

class Logout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    logout = () => {
        axios.post(`${API_URL}/perform-logout`).then(() => {
            sessionStorage.setItem('isAuth', 'false');
            this.props.isAuthenticatedHandler();
        })
    }

    render() {

        return (
            <div>
                <Grid item lg={12}>
                    <Button variant="contained" color="secondary" onClick={this.logout}>EXIT ADMIN</Button>
                </Grid>
            </div>
        );
    }
}

export default Logout