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
  const userContext = useContext(UserContext)

  async function sessionInfo() {
    //console.log(session);
    console.log("User", userContext.user)
    console.log("Session", userContext.session)
  }

  return (
    <Fab color="error" variant="extended" onClick={sessionInfo} sx={styles.fabLogout}>
      Session
    </Fab>
  );
}
export default SessionDebug;
