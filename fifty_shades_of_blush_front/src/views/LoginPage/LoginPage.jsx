import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Cookies from 'universal-cookie';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const url = 'http://localhost:8080/api/authenticate';
const client = require('../../tools/rest/client');

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { authenticatedUser: {}, username: "", password: ""};
  }

  setUsername = event => {
    this.setState({username: event.target.value });
  };

  setPassword = event => {
    this.setState({password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("submitting value")
    client({
      method: 'POST',
      path: url,
      entity: { "username": this.state.username, "password": this.state.password },
      headers: { 'Content-Type': 'application/json' }
    }).done(response => {
      console.log(response.entity);
    });

  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ADMIN ACCESS
          </Typography>
          <form className="form" noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e)=>this.setUsername(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>this.setPassword(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default LoginPage;