import React, { useState, useEffect, useContext } from "react";
import PageTemplate from "../components/templateContentListPage";
import Header from "../components/headerMovieList";
import { discoverMoviesQuery, upcomingMoviesQuery, suggestedMoviesQuery, heroMovieQuery } from "../hooks/useMovieQueries";
import { UserContext } from "../contexts/userContext";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const HomePage = (props) => {
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
