import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Avatar,
  Paper,
  Snackbar,
} from "@material-ui/core";
import { Link } from '@mui/material';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MuiAlert from "@material-ui/lab/Alert";
import {InputAdornment} from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage:
      'url("https://t3.ftcdn.net/jpg/03/55/60/70/360_F_355607062_zYMS8jaz4SfoykpWz5oViRVKL32IabTP.jpg")',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "50px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length === 0 || password.length === 0) {
      setError("Tên đăng nhập hoặc mật khẩu không thể trống");
      setSuccess(false);
    }
    // else if (username !== "admin" || password !== "password") {
    //   setError("Tên đăng nhập hoặc mật khẩu sai");
    //   setSuccess(false);
    // } 
    else {
      setError("");
      setSuccess(true);
      navigate("/");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError("");
    if (e.target.value === "") {
      setPassword("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={24} className={classes.paper}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <form noValidate className={classes.form} onSubmit={handleSubmit}>
            
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên đăng nhập"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleUsernameChange}
              error={error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}  
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              error={error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            {error.length > 0 && (
              <Typography color="error" variant="subtitle2">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Đăng nhập
            </Button>
            <Button
              style={{marginTop:"0"}}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sử dụng SSO
            </Button>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className={classes.forgotPassword}>
              <Link href="#" variant="body2">
                Hướng dẫn
              </Link>
            </div>
            <div>
              <Link href="#" variant="body2">
                Quên mật khẩu
              </Link>
            </div>
          </div>
            
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
