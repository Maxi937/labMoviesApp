import React, { useState, useEffect, useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import Header from "../components/headerMovieList";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { discoverMoviesQuery, upcomingMoviesQuery, suggestedMoviesQuery } from "../hooks/useMovieQueries";
import { UserContext } from "../contexts/userContext";

const HomePage = (props) => {
  const { user } = useContext(UserContext);
  const discoverPage = (
    <PageTemplate
      movieQuery={suggestedMoviesQuery}
      title="Suggested"
      action={(movie) => {
        return user && <AddToFavouritesIcon movie={movie} />;
      }}
    />
  );

  const upcomingPage = (
    <PageTemplate
      movieQuery={upcomingMoviesQuery}
      title="Coming Soon"
      action={(movie) => {
        return user && <AddToMustWatchIcon movie={movie} />;
      }}
    />
  );

  const components = [discoverPage, upcomingPage];

  return <Header components={components} />;
};

export default HomePage;
