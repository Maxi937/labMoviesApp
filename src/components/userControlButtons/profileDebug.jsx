import React, { useContext, useState } from "react";
import Fab from "@mui/material/Fab";
import { UserContext } from "../../contexts/userContext";


const styles = {
  root: {
    padding: "20px",
  },
  fab: {
    position: "fixed",
    bottom: 70,
    right: 5,
  },
};

function ProfileDebug() {
  const userContext = useContext(UserContext)
  const favourites = userContext.favourites

  async function profileInfo() {
    console.log("Favourites", favourites)
  }

  return (
    <Fab color="info" variant="extended" onClick={profileInfo} sx={styles.fab}>
      profile
    </Fab>
  );
}
export default ProfileDebug;
