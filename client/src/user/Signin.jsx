import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import auth from "./auth-helper.js";
import { signin } from "../api/api-auth.js";
import { styles } from "../styles/styles.js";
import Logo from "../static/logo.jpg";


export default function Signin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { from } = location.state || { from: { pathname: "/" } };
  const { redirectToReferrer } = values;

  if (redirectToReferrer) {
    return <Navigate to={from} />;
  }

  return (
    <Box sx={styles.container}>
      {/* Header */}
      <AppBar position="fixed" sx={styles.appBar}>
        <Toolbar sx={styles.toolbar}>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/')}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={styles.headerTitle}>
            Login Form
          </Typography>
          <IconButton edge="end" color="inherit">
            <MoreHorizIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Login card */}
      <Card sx={styles.card}>
        {/* Logo */}
        <Box sx={styles.logoContainer}>
            <Box sx={styles.logoWrapper}>
                <img
                    src={Logo}
                    alt="custom logo"
                    style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover"
                    }}
                />
            </Box>
        </Box>

        {/* Company name */}
        <Typography variant="h4" sx={styles.brandName}>
          TerraCode
        </Typography>

        {/* Welcoming text */}
        <Typography variant="h6" sx={styles.welcomeText}>
          Welcome Back to TerraCode
        </Typography>

        {/* Email input */}
        <TextField
          id="email"
          type="email"
          placeholder="Email"
          fullWidth
          value={values.email}
          onChange={handleChange("email")}
          sx={styles.textField}
        />

        {/* Password input */}
        <TextField
          id="password"
          type="password"
          placeholder="Password"
          fullWidth
          value={values.password}
          onChange={handleChange("password")}
          sx={styles.textField}
        />

        {/* Error message */}
        {values.error && (
          <Typography color="error" sx={styles.errorText}>
            {values.error}
          </Typography>
        )}

        {/* Login button */}
        <Button
          variant="contained"
          fullWidth
          onClick={clickSubmit}
          sx={styles.loginButton}
        >
          Login
        </Button>

        {/* Forgot password Link */}
        <Link href="#" underline="hover" sx={styles.link}>
          Forgot Password
        </Link>

        {/* Signup link */}
        <Typography variant="body2" sx={{ color: "#6b7280", fontSize: "0.875rem" }}>
            New to the TerraCode?{"  "}
            <Typography
                component="a"
                href="/signup"
                sx={{
                color: "#1e3a8a",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": {
                    textDecoration: "underline",
                },
            }}
            >
            Sign Up
            </Typography>
        </Typography>
      </Card>
    </Box>
  );
}