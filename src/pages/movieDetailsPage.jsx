import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits } from "../api/tmdb-api";
import { useQuery } from "react-query";
import { useQueries } from "react-query";
import Spinner from "../components/spinner";

const MovieDetailsPage = () => {
  const { id } = useParams();

  const { data: movie, error, isLoading, isError } = useQuery(["movie"], async () => getMovie(id));
  const { data: credits, errorCredits, isLoadingCredits, isErrorCredits } = useQuery(["credits"], async () => getMovieCredits(id));

  
  // const results = useQueries({
  //   queries: [
  //     { queryKey: ["movie", { id: id }], queryFn: getMovie },
  //     { queryKey: ["credits", { id: id }], queryFn: getMovieCredits },
  //   ],
  // });


  console.log(movie);
  console.log(credits)

  /*

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  */

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
