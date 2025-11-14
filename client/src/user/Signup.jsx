import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { create } from "../api/api-user";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = () => setOpen(false);

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setOpen(true);
      }
    });
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          margin: "40px auto",
          textAlign: "center",
          padding: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Sign Up
          </Typography>

          <TextField
            id="name"
            label="Name"
            fullWidth
            sx={{ mb: 2 }}
            value={values.name}
            onChange={handleChange("name")}
          />

          <TextField
            id="email"
            label="Email"
            type="email"
            fullWidth
            sx={{ mb: 2 }}
            value={values.email}
            onChange={handleChange("email")}
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={values.password}
            onChange={handleChange("password")}
          />

          {values.error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {values.error}
            </Typography>
          )}
        </CardContent>

        <CardActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" onClick={clickSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button variant="contained" onClick={handleClose}>
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}
