import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/api-auth.js";
import { styles } from "../styles/styles.js";
import Logo from "../static/logo.jpg";

export default function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "developer",
    error: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/signin');
  };

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      role: values.role || undefined,
    };

    if (!user.name || !user.email || !user.password) {
      setValues({ ...values, error: "All fields are required" });
      return;
    }

    signup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "" });
        setOpen(true);
      }
    });
  };

  return (
    <Box sx={styles.container}>
      {/* Close button */}
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: "absolute",
          top: 24,
          left: 24,
          color: "#1f2937",
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Main Card */}
      <Card sx={styles.card}>
        <CardContent>
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
            Welcome to TerraCode
          </Typography>

          {/* Name input */}
          <TextField
            fullWidth
            placeholder="Name"
            value={values.name}
            onChange={handleChange("name")}
            sx={styles.textField}
          />

          {/* Email input */}
          <TextField
            fullWidth
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange("email")}
            sx={styles.textField}
          />

          {/* Password input */}
          <TextField
            fullWidth
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange("password")}
            sx={styles.textField}
          />

          {/* Role selection */}
          <FormControl fullWidth sx={styles.textField}>
            <InputLabel>Role</InputLabel>
            <Select
              value={values.role}
              label="Role"
              onChange={handleChange("role")}
            >
              <MenuItem value="developer">Developer</MenuItem>
              <MenuItem value="company">Company</MenuItem>
            </Select>
          </FormControl>

          {/* Error message */}
          {values.error && (
            <Typography color="error" sx={styles.errorText}>
              {values.error}
            </Typography>
          )}

          {/* Signup button */}
          <Button
            fullWidth
            variant="contained"
            onClick={clickSubmit}
            sx={styles.loginButton}
          >
            Sign Up
          </Button>

          {/* Forgot password */}
          <Typography
            component="a"
            href="#"
            sx={styles.link}
          >
            Forgot Password
          </Typography>

          {/* Signin link */}
          <Typography variant="body2" sx={{ color: "#6b7280", fontSize: "0.875rem" }}>
            Already have an account?{"  "}
            <Typography
              component="a"
              href="/signin"
              sx={{
                color: "#1e3a8a",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign In
            </Typography>
          </Typography>
        </CardContent>
      </Card>

      {/* Success dialog display */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "#1e3a8a", fontWeight: 700 }}>
          New Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created. Please sign in to continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={styles.loginButton}
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}