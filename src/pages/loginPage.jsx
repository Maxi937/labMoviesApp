import React, { useState, useEffect } from "react";
import Login from "../components/loginForm/index";
import LoginForm from "../components/loginForm/loginForm";
import SignupForm from "../components/loginForm/signupForm";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";

const styles = {
  root: {
    display: "flex",
  },
};
const LoginPage = (props) => {
  return (
    <Box sx={styles.root}>
      <LoginForm />
      <SignupForm/>
    </Box>
  );
};
export default LoginPage;
