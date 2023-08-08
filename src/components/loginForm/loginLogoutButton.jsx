import React, { useState, useContext } from "react";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { logout } from "../../api/supabase-api";
import LoginSignupForm from ".";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()

  function signout() {
    setLoginOpen(false)
    navigate("/")
    logout();
    return 
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
