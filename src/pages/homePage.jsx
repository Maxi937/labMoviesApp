import React, { useState, useEffect, useContext } from "react";
import PageTemplate from "../components/templateContentListPage";
import Panel from "../components/contentPanel";
import { discoverMoviesQuery, upcomingMoviesQuery, suggestedMoviesQuery, heroMovieQuery } from "../hooks/useMovieQueries";
import { UserContext } from "../contexts/userContext";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const HomePage = (props) => {
  return (
    <Panel>
      {[<PageTemplate
        key="suggested"
        hero={true}
        contentData={suggestedMoviesQuery}
        title="Suggested"
        action={(movie) => {
          return <AddToFavouritesIcon content={movie} />;
        }}
      />]}
    </Panel>
  );
};

export default HomePage;
