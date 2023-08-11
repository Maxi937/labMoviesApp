import React, { useState, useEffect } from "react";
import Login from "../components/loginForm/index";
import SignupForm from "../components/loginForm/signupForm";
import { Grid } from "@mui/material";

const styles = {
  root: {
    display: "flex"
  }
}
const LoginPage = (props) => {
  return (
    <Box sx={styles.root}>
      <Login />
    </Box>
  );
};
export default LoginPage;
