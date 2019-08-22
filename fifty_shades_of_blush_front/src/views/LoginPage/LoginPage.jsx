import React from 'react';
import {Redirect} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthenticationService from '../../tools/authProvider/AuthenticationService';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirectToReferrer: false
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

  login = event => {
    event.preventDefault();
    AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
      .then((response) => {
        console.log(response)
        sessionStorage.setItem('isAuth', 'true');
        AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        this.setState({redirectToReferrer: true});
      }).catch((exc) => {
        console.log(exc)
      })
  }

  render() {

    const { from } = this.props.location.state || { from: { pathname: '/' } }

    console.log(from)

    if (sessionStorage.getItem('isAuth') === 'true') {
      return <Redirect to={from} />
    }

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
          <form className="form" noValidate onSubmit={this.login}>
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