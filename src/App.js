import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate  } from "react-router-dom";

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
    // const navigate = useNavigate();
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(username ==="" || password ===""){
            setError("Tên đăng nhập hoặc mật khẩu không thể bỏ trống")
            setSuccess(false)
        }
        else if (username !== 'admin' || password !== 'password') {
            setError("Sai tên đăng nhập hoặc mật khẩu");
            setSuccess(false);
        } else {
            console.log("success");
            setError("");
            setSuccess(true);
            // navigate('/new-page')
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
                        Đăng nhập
                    </Typography>
                    <form noValidate className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
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
                        />
                        <TextField
                            variant="outlined"
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
                        />
                        {error.length !== 0 && (
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
                                Đăng nhập thành công
                            </MuiAlert>
                        </Snackbar>
                    </form>
                </div>
            </Paper>
        </div>
    );
};

export default Login;    