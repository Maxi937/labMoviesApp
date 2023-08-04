import React,{ useContext }  from "react";
import { useQuery } from "react-query";
import PageTemplate from '../components/templateMovieListPage'
import { MoviesContext } from "../contexts/moviesContext";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

const upcomingMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery("discoverUpcoming", getUpcomingMovies);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToMustWatchIcon movie={movie} />;
      }}
    />
  );
};

export default upcomingMoviesPage;