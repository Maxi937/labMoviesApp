import React, { useContext, useState } from "react";
import { signup } from "../../api/supabase-api.js";
import { Alert, AlertTitle } from '@mui/material';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles";

const SignupForm = () => {
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(defaultValues);

  async function onSubmit(signupDetails) {
    const response = await signup(signupDetails);
    console.log(response)
  }

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Signup
      </Typography>

      {errors.login && (
        <Alert severity="error">
          <AlertTitle>I'm Sorry</AlertTitle>
          <strong>{errors.login.message}</strong>
        </Alert>
      )}

      <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: "First Name is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField sx={{ width: "40ch" }} variant="outlined" margin="normal" required onChange={onChange} value={value} id="firstName" label="First Name" />
          )}
        />
        {errors.email && (
          <Typography variant="h6" component="p">
            {errors.firstName.message}
          </Typography>
        )}

        <br></br>

        <Controller
          name="lastName"
          control={control}
          rules={{ required: "Last Name is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField sx={{ width: "40ch" }} variant="outlined" margin="normal" required onChange={onChange} value={value} id="lastName" label="Last Name" />
          )}
        />
        {errors.email && (
          <Typography variant="h6" component="p">
            {errors.lastName.message}
          </Typography>
        )}

        <br></br>

        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField sx={{ width: "40ch" }} variant="outlined" margin="normal" required onChange={onChange} value={value} id="email" label="Email" autoFocus />
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
            <TextField sx={{ width: "40ch" }} variant="outlined" margin="normal" required onChange={onChange} value={value} id="password" label="Password" />
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

export default SignupForm;
