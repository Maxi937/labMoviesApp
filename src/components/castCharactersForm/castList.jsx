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

const CastList = ({ actors, state}) => {

  let actorCards = actors.map((actor) => {
    return (
      <>
      <Actor
          key={`character: ${actor.character} ${actor.id}`}
          action={(actor) => {
            return <DeleteCharacterIcon key={("del", actor.id)} actor={actor} state={state}/>;
          }}
          actor={actor}
          character={actor}
        />
      </>
    );
  });

  return <>{actorCards}</>;
};

export default CastList;
