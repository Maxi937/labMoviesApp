import React, { useContext, useState } from "react";
import { login } from "../../api/supabase-api.js";
import { Alert, AlertTitle } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles.js";
import { UserContext } from "../../contexts/userContext.jsx";


const LoginForm = () => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const context = useContext(UserContext)

  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(defaultValues);

  async function onSubmit(loginDetails) {
    const response = await login(loginDetails);

    if (response.error) {
      return setError("login", {
        type: "authentication",
        message: "Unable to find a User with this email or password",
      });
    }
    //context.authenticate(response.data.user)
  }

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3" sx={styles.formHeaders}>
        Login
      </Typography>

      {errors.login && (
        <Alert severity="error">
          <AlertTitle>I'm Sorry</AlertTitle>
          <strong>{errors.login.message}</strong>
        </Alert>
      )}

      <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField variant="outlined" margin="normal" required onChange={onChange} value={value} id="email" label="Email" autoFocus />
          )}
        />
        {errors.email && (
          <Typography variant="h6" component="p">
            {errors.email.message}
          </Typography>
        )}

        <br></br>

        <Controller
          name="password"
          control={control}
          rules={{ required: "password is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField sx={styles.textField} variant="outlined" margin="normal" required onChange={onChange} value={value} id="password" label="Password" />
          )}
        />
        {errors.password && (
          <Typography variant="h6" component="p">
            {errors.password.message}
          </Typography>
        )}

        <Box sx={styles.buttons}>
          <Button type="submit" color="primary" sx={styles.submit}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
