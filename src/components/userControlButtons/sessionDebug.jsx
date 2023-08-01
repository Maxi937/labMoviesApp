import React, { useContext, useState } from "react";
import Fab from "@mui/material/Fab";
import { logout } from "../../api/supabase-api";
import useSession from "../../hooks/useSession";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";


const styles = {
  root: {
    padding: "20px",
  },
  fabLogout: {
    position: "fixed",
    bottom: 2,
    right: 120,
  },
};

function SessionDebug() {
  const context = useContext(UserContext)

  const [session, setSession] = useSession()
  
  async function sessionInfo() {
    //console.log(session);
    console.log("User", context.user)
  }

  return (
    <Fab color="error" variant="extended" onClick={sessionInfo} sx={styles.fabLogout}>
      Session
    </Fab>
  );
}
export default SessionDebug;
