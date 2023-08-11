import React, { useState, useEffect } from "react";
import Login from "../components/loginForm/index"
import SignupForm from "../components/loginForm/signupForm";
import { Grid } from "@mui/material";

const LoginPage = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs>
          <Login />
      </Grid>
    </Grid>
  );
};
export default LoginPage;
