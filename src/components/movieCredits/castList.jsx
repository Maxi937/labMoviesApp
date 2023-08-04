import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Actor from "./actor.jsx";

const CastList = ({ castList }) => {
  let actorCards = castList.map((actor) => {
    if (actor.order >= 12) {
      return;
    }
    return (
      <Grid item xs={1} sm={2} md={2} key={actor.id}>
        <Actor actor={actor} />
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
