import React, { useState, useEffect, useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import Header from "../components/headerMovieList";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { discoverMoviesQuery, upcomingMoviesQuery, suggestedMoviesQuery, heroMovieQuery } from "../hooks/useMovieQueries";
import { UserContext } from "../contexts/userContext";

const HomePage = (props) => {
  const { user } = useContext(UserContext);

  const suggested = (
    <PageTemplate
      hero={true}
      movieQuery={suggestedMoviesQuery}
      title="Suggested"
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />;
      }}
    />
  );

  const components = [suggested];

  return <Header components={components} />;
};

export default HomePage;
