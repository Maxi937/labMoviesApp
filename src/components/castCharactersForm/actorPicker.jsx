import React from "react";
import { Box } from "@mui/material";
import { Star } from "@mui/icons-material";
import Actor from "../actorCard";
import ContentSlider from "../contentSlider"
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
          <Box key={("boxselected", actor.id)} sx={styles.selected}>
            <Star key={("starselected", actor.id)} sx={styles.selected}></Star>
            <Actor key={("actorselected", actor.id)} actor={actor} overrideClick={overrideClick}/>
          </Box>
        </>
      );
    }
    return (
      <Box key={`box ${actor.id}`}>
        <Star key={`stars ${actor.id}`} sx={styles.notSelected}></Star>
        <Actor key={`pick ${actor.id}`} actor={actor} overrideClick={overrideClick} size="small"/>
      </Box>
    );
  });

  return <>
  {actorCards}
  </>;
};

export default ActorPicker;
