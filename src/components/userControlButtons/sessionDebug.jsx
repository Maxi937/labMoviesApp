import React, { useContext, useState } from "react";
import Fab from "@mui/material/Fab";
import { logout } from "../../api/supabase-api";
import useSession from "../../hooks/useSession";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../contexts/sessionContext";

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
  const [session, setSession] = useSession()

  async function sessionInfo() {
    console.log(session);
  }

  return (
    <Fab color="error" variant="extended" onClick={sessionInfo} sx={styles.fabLogout}>
      Session
    </Fab>
  );
}
export default SessionDebug;
