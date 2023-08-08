import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateTvPage";
import { getTvShow } from "../api/tmdb-api";
import { useQuery } from "react-query";
import MovieCredits from "../components/movieCredits";
import Spinner from "../components/spinner";
import TvDetails from "../components/tvDetails";

const TvDetailsPage = () => {
  const { id } = useParams();

  const { data: tvShow, error, isLoading, isError } = useQuery(["tv", id], async () => getTvShow(id));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {tvShow ? (
        <>
          <PageTemplate tvShow={tvShow}>
            <TvDetails tvShow={tvShow} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for tv details</p>
      )}
    </>
  );
};

export default TvDetailsPage;
