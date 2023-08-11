import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getUserMovie } from "../api/supabase-api";
import { useQuery } from "react-query";
import UserMovieCredits from "../components/usermovieCredits";
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
    movie.genres = []
    for (const [key, value] of Object.entries(tmdbMovieGenres)) {
      if (movie.genre_ids.includes(value)) {
        movie.genres.push({ id: value, name: key})
      }
    }
    console.log(movie.genres)
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie} userMovie={true}>
            <MovieDetails movie={movie} />
            <UserMovieCredits movie={movie}/>
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default UserMovieDetailsPage;
