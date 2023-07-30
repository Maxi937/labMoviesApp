import React, { useState, useContext } from "react";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import LoginForm from ".";
import useSession from "../../hooks/useSession";
import { logout } from "../../api/supabase-api";

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
  const [session, setSession] = useSession();

  const [loginOpen, setLoginOpen] = useState(false);

  async function signout() {
    console.log("signing out");
    setSession("")
    return await logout();
  }

  return (
    <>
      {!session ? (
        <>
          <Fab color="primary" variant="extended" onClick={() => setLoginOpen(true)} sx={styles.fabLogin}>
            Login
          </Fab>
          <Drawer anchor="left" open={loginOpen} onClose={() => setLoginOpen(false)}>
            <LoginForm />
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
