import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import CastCharacterForm from "../components/castCharactersForm";
import { getActorFavourites, getUserMovie } from "../api/supabase-api";
import { UserContext } from "../contexts/userContext";
import { getActorsQuery, getUserMovieQuery } from "../hooks/useMovieQueries";
import Spinner from "../components/spinner"

const CastCharactersPage = (props) => {
  const { id } = useParams()
  const { data: movie, error, isLoading, isError } = getUserMovieQuery(id)

  const {actorFavourites, user} = useContext(UserContext)
  const actorsQuery = getActorsQuery(actorFavourites)
  const isLoadingActor = actorsQuery.find((m) => m.isLoading === true);
  const actors = actorsQuery.map((q) => q.data);

  if (isLoading || isLoadingActor) {
    return <Spinner />;
  }

  if (isError ) {
    return <h1>{error.message}</h1>;
  }


  return (
      <CastCharacterForm movieId={id} userId={user.id} favouriteActors = {actors}/>
  );
};

export default CastCharactersPage;