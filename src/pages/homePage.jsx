import React, { useState, useEffect, useContext } from "react";
import PageTemplate from "../components/templateContentListPage";
import Panel from "../components/contentPanel";
import { discoverMoviesQuery, upcomingMoviesQuery, suggestedMoviesQuery, heroMovieQuery } from "../hooks/useMovieQueries";
import { UserContext } from "../contexts/userContext";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Spinner from "../components/spinner";

const HomePage = (props) => {
  const { data, isLoading, isError } = suggestedMoviesQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const content = data ? data.results : [];

  return (
    <Panel>
      <PageTemplate
        key="suggested"
        hero={true}
        content={content}
        title="Suggested"
        action={(movie) => {
          return <AddToFavouritesIcon content={movie} />;
        }}
      />
    </Panel>
  );
};

export default HomePage;
