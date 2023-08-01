import React, { useState, useEffect } from "react";
import LoginForm from "../components/loginForm";
import { Grid } from "@mui/material";

const LoginPage = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs>
          <LoginForm />
      </Grid>
      <Grid item xs>
          <SignupForm />
      </Grid>
    </Grid>
  );
};
export default LoginPage;
