import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import { logout } from "../../api/supabase-api";
import { useNavigate } from "react-router-dom";

const styles = {
  root: {
    padding: "20px",
  },
  fabLogout: {
    position: "fixed",
    bottom: 2,
    right: 5,
  },
};

function LogoutButtonDebug() {
  const navigate = useNavigate()

  async function signout() {
    console.log("signing out");
    await logout();
    return navigate(0)
  }

  return (
    <Fab color="tertiary" variant="extended" onClick={signout} sx={styles.fabLogout}>
      Logout
    </Fab>
  );
}
export default LogoutButtonDebug;
