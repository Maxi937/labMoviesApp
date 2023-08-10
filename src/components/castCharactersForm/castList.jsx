import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Actor from "../actorCard";
import AddToFavouritesIcon from "../cardIcons/addActorToFavourites";
import Typography from "@mui/material/Typography";

const CastList = ({ characters }) => {
    if(!characters) {
        return
    }

  let actorCards = characters.map((character) => {
    return (
      <>
        <Actor key={("character", character.actor.id)} actor={character.actor} />
        <Typography sx={{textAlign: "center"}}component="h4" variant="h6">
          {character.name}
        </Typography>
      </>
    );
  });

  return <>{actorCards}</>;
};

export default CastList;
