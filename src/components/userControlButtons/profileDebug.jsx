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
  const {movieFavourites, mustWatchMovies, tvFavourites, mustWatchTelevision} = useContext(UserContext)

  function profileInfo() {
    console.log("Movie Favourites", movieFavourites)
    console.log("Must Watch Movies", mustWatchMovies)
    console.log("Tv Favourites", tvFavourites)
    console.log("Must Watch Tv", mustWatchTelevision)
  }

  return (
    <Fab color="info" variant="extended" onClick={profileInfo} sx={styles.fab}>
      profile
    </Fab>
  );
}
export default ProfileDebug;
