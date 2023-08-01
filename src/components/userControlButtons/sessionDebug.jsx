import React, { useContext, useState } from "react";
import Fab from "@mui/material/Fab";
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
  const {user, session} = useContext(UserContext)

  async function sessionInfo() {
    //console.log(session);
    console.log("User", user)
    console.log("Session", session)
  }

  return (
    <Fab color="error" variant="extended" onClick={sessionInfo} sx={styles.fabLogout}>
      Session
    </Fab>
  );
}
export default SessionDebug;
