import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import Header from "../components/headerMovieList";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { discoverMoviesQuery, upcomingMoviesQuery } from "../hooks/useMovieQueries";

const HomePage = (props) => {
  const discoverPage = (
    <PageTemplate
      movieQuery = {discoverMoviesQuery}
      title="Discover Movies"
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />;
      }}
    />
  );

  const upcomingPage = (
    <PageTemplate
      movieQuery = {upcomingMoviesQuery}
      title="Coming Soon"
      action={(movie) => {
        return <AddToMustWatchIcon movie={movie} />;
      }}
    />
  );

  const components = [discoverPage, upcomingPage]

  return <Header components={components}/> ;
};

export default HomePage;
