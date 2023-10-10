import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
`;

const ButtonContainer = styled(Box)`
  margin-top: 1rem; 
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const SsoButton = styled(Button)`
  background-color: #007bff;
  color: white;
  text-transform: uppercase;
  font-weight: medium;
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  margin-top: 1rem; 
  &:hover {
    background-color: #0069d9;
  }
`;

const LoginButton = styled(Button)`
  background-color: #28a745; 
  color: white;
  text-transform: uppercase;
  font-weight: medium;
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  &:hover {
    background-color: #218838; 
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <LoginForm>
        <Typography variant="h6" component="h1" gutterBottom>
          Bạn cần đăng nhập để tiếp tục
        </Typography>
        <TextField
          label="Tài khoản"
          variant="outlined"
          fullWidth
          margin="normal"
          
        />
        <TextField
          label="Mật khẩu"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <ButtonContainer>
          <LoginButton onClick={() => { /* Handle regular login here */ }}>
            Đăng nhập
          </LoginButton>
          <SsoButton
            onClick={() => {
              navigate("/dang-nhap-sso");
            }}
          >
            Đăng nhập SSO
          </SsoButton>
        </ButtonContainer>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
