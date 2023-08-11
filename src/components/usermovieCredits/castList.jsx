import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Actor from "../actorCard";
import AddToFavouritesIcon from "../cardIcons/addActorToFavourites";

const CastList = ({ castList }) => {
  let actorCards = castList.map((actor) => {
    return (
      <Grid item xs={1} sm={2} md={2} key={actor.id}>
        <Actor key={actor.id} actor={actor} />
      </Grid>
    );
  });

  return (
    <Grid container spacing={5}>
      {actorCards}
    </Grid>
  );
};

export default CastList;
