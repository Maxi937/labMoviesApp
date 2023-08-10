import React from "react";
import { Box } from "@mui/material";
import { Star } from "@mui/icons-material";
import Actor from "../actorCard";
import AddToFavouritesIcon from "../cardIcons/addActorToFavourites";

const styles = {
  selected: {
    textAlign: "center",
  },
  notSelected: {
    visibility: "hidden",
    textAlign: "center",
  },
};

const ActorPicker = ({ selected, actors, overrideClick }) => {
  let actorCards = actors.map((actor) => {
    if (actor.id === selected.id) {
      return (
        <>
          <Box key={`boxs ${actor.id}`} sx={styles.selected}>
            <Star key={`star ${actor.id}`} sx={styles.selected}></Star>
            <Actor key={`picks ${actor.id}`} actor={actor} overrideClick={overrideClick} />
          </Box>
        </>
      );
    }
    return (
      <Box key={`box ${actor.id}`}>
        <Star key={`stars ${actor.id}`} sx={styles.notSelected}></Star>
        <Actor key={`pick ${actor.id}`} actor={actor} overrideClick={overrideClick} />
      </Box>
    );
  });

  return <>{actorCards}</>;
};

export default ActorPicker;
