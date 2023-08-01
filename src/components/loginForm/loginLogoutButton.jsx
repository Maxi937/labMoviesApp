import React, { useState, useContext } from "react";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";

import { logout } from "../../api/supabase-api";
import LoginSignupForm from ".";
import { UserContext } from "../../contexts/userContext";

const styles = {
  root: {
    padding: "20px",
  },
  fabLogin: {
    position: "fixed",
    bottom: 2,
    left: 2,
  },
};

function LoginLogoutButton() {
  // const [session, setSession] = useSession();
  const userContext = useContext(UserContext)
  const user = userContext.user

  const [loginOpen, setLoginOpen] = useState(false);

  async function signout() {
    console.log("signing out");
    return await logout();
  }

  return (
    <>
      {!user ? (
        <>
          <Fab color="primary" variant="extended" onClick={() => setLoginOpen(true)} sx={styles.fabLogin}>
            Login
          </Fab>
          <Drawer anchor="left" open={loginOpen} onClose={() => setLoginOpen(false)}>
            <LoginSignupForm />
          </Drawer>
        </>
      ) : (
        <Fab color="secondary" variant="extended" onClick={signout} sx={styles.fabLogin}>
          Logout
        </Fab>
      )}
    </>
  );
}

export default LoginLogoutButton;
