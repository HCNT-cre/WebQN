import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  TextField,
  Button,
  Typography,
  Avatar,
  Paper,
  Snackbar,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== 'admin' || password !== 'password') {
      setError(true);
      setSuccess(false);
    } else {
      setError(false);
      setSuccess(true);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError(false);
    if (e.target.value === '') {
      setPassword('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };

  
  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleUsernameChange}
              error={error}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              error={error}
            />
            {error && (
              <Typography color="error" variant="subtitle2">
                Incorrect username or password
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Snackbar
              open={success}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleSnackbarClose}
                severity="success"
              >
                Login Successful!
              </MuiAlert>
            </Snackbar>
          </form>
        </div>
      </Paper>
    </div>
);
};

export default Login;    