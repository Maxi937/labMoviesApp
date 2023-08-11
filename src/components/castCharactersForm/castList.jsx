import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Actor from "../actorCard";
import AddToFavouritesIcon from "../cardIcons/addActorToFavourites";
import DeleteCharacterIcon from "../cardIcons/deleteCharacter";
import Typography from "@mui/material/Typography";

const CastList = ({ characters, setCast }) => {
  if (!characters) {
    return;
  }

  let actorCards = characters.map((c) => {
    return (
      <>
        <Actor
          key={("character", c.id)}
          action={(character) => {
            return <DeleteCharacterIcon character={character}/>;
          }}
          actor={c.actor}
          character={c}
        />
        <Typography sx={{ textAlign: "center" }} component="h4" variant="h6">
          {c.name}
        </Typography>
      </>
    );
  });

  return <>{actorCards}</>;
};

export default CastList;
