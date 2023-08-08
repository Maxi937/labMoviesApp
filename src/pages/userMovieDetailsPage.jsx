import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getUserMovie } from "../api/supabase-api";
import { useQuery } from "react-query";
import MovieCredits from "../components/movieCredits";
import Spinner from "../components/spinner";
import { tmdbMovieGenres } from "../util";

const UserMovieDetailsPage = () => {
  const { id } = useParams();

  const { data: movie, error, isLoading, isError } = useQuery(["movie", id], async () => getUserMovie(id));


  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if(movie) {
    movie.genres = [18]
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie} getImages={false}>
            <MovieDetails movie={movie} />
            {/* <MovieCredits movie={movie} /> */}
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default UserMovieDetailsPage;
