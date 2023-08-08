import React, { useState, useContext } from "react";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { logout } from "../../api/supabase-api";
import LoginSignupForm from ".";
import { UserContext } from "../../contexts/userContext";

const styles = {
  fabLogin: {
    color: 'white',
    backgroundColor: "#4caf50",
    '&:hover': {
      backgroundColor: "#8bc34a",
    },
  }
};

function LoginLogoutButton() {
  const {user} = useContext(UserContext)
  const [loginOpen, setLoginOpen] = useState(false);

  async function signout() {
    setLoginOpen(false)
    return await logout();
  }

  return (
    <>
      {!user ? (
        <>
          <Fab sx={styles.fabLogin} variant="extended" onClick={() => setLoginOpen(true)}>
            Login
          </Fab>
          <Drawer anchor="left" open={loginOpen} onClose={() => setLoginOpen(false)}>
            <LoginSignupForm />
          </Drawer>
        </>
      ) : (
        <Fab color="info" variant="extended" onClick={signout}>
          Logout
        </Fab>
      )}
    </>
  );
}

export default LoginLogoutButton;
