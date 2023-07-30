import { Typography, Stack } from "@mui/material";
import LoginForm from "./loginForm";
import SignupForm from "./signupForm";

const LoginSignupForm = () => {
  return (
    <>
      <Stack spacing={7}>
        <LoginForm />
        <Typography variant="h6" component="p">
          Why Not Sign up...
        </Typography>
        <SignupForm />
      </Stack>
    </>
  );
};

export default LoginSignupForm;
