import React, {useEffect} from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Actor from "../actorCard";
import AddToFavouritesIcon from "../cardIcons/addActorToFavourites";
import DeleteCharacterIcon from "../cardIcons/deleteCharacter";
import Typography from "@mui/material/Typography";
import { getActor } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner"

const CastList = ({ characters}) => {
  if (!characters) {
    return;
  }



  let actorCards = characters.map((c) => {
    const { data, isLoading, isError } = useQuery(["actor", c.id], async () => getActor(c.actor))

    if (isLoading) {
      return <Spinner />;
    }
  
    if (isError) {
      return <h1>{error.message}</h1>;
    }
  
    const actor = data ? data : {};

    console.log(data)

    return (
      <>
      <Actor
          key={`character: ${c.id}`}
          action={(character) => {
            return <DeleteCharacterIcon key={("del", c.id)} character={character}/>;
          }}
          actor={actor}
          character={c}
        />
        <Typography key={("text", c.id)} sx={{ textAlign: "center" }} component="h4" variant="h6">
          {c.name}
        </Typography>
      </>
    );
  });

  return <>{actorCards}</>;
};

export default CastList;
