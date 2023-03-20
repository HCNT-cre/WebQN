import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
=======
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



const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App