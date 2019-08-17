import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthenticationService from '../../tools/authProvider/AuthenticationService';


const client = require('../../tools/rest/client');
const API_URL = 'http://localhost:8080/api';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasLoginFailed: false,
      username: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState(
      {
        [event.target.name]
          : event.target.value
      }
    )
  }

  handleSubmit = event => {
    event.preventDefault();

    client({
      method: 'POST',
      path: `${API_URL}/authenticate`,
      entity: { "username": this.state.username, "password": this.state.password },
      headers: { 'Content-Type': 'application/json' }
    }).done(response => {

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      } else {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('token', response.entity.token);
        this.props.history.push('/')
      }
    });
  }

  handleSubmit2 = event => {
    event.preventDefault();

    AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
      .then(() => {
        sessionStorage.setItem('isLoggedIn', 'true');
        AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        this.props.history.push('/')
      }).catch(() => {
        this.setState({ hasLoginFailed: true })
      })
  }

  render() {

    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      this.props.history.push('/');
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ADMIN ACCESS
          </Typography>
          <form className="form" noValidate onSubmit={this.handleSubmit2}>
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
              value={this.state.username}
              onChange={this.handleChange}
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
              value={this.state.password}
              onChange={this.handleChange}
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