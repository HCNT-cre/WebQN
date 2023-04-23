import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const LoginContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const LoginForm = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const LoginSSO = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <LoginContainer>
      <LoginForm>
        <Typography variant="h5" component="h2" gutterBottom>
          Đăng nhập SSO
        </Typography>
        <TextField label="Tài khoản" variant="outlined" />
        <TextField label="Mật khẩu" type="password" variant="outlined" />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch({ type: "LOGINED" });
            navigate("/");
          }}
        >
          Đăng nhập
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginSSO;