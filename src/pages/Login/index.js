import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const LoginContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const LoginForm = styled(Paper)`
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const SsoButton = styled(Button)`
  background-color: #007bff;
  color: white;
  text-transform: uppercase;
  font-weight: medium;
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  &:hover {
    background-color: #0069d9;
  }
`;

const Login = () => {
  const navigate = useNavigate();

  return (
    <LoginContainer>
      <LoginForm>
        <Typography variant="h6" component="h1" gutterBottom>
          Bạn cần đăng nhập để tiếp tục
        </Typography>
        <SsoButton
          onClick={() => {
            navigate("/dang-nhap-sso");
          }}
        >
          Đăng nhập SSO
        </SsoButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;