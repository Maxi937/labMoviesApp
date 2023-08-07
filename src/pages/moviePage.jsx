import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateContentListPage";
import Panel from "../components/contentPanel";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { discoverMoviesQuery, upcomingMoviesQuery } from "../hooks/useMovieQueries";

const MoviePage = (props) => {
  const discoverPanel = [
    <PageTemplate
      key="discover"
      movieQuery={discoverMoviesQuery}
      title="Discover Movies"
      action={(movie) => {
        return <AddToFavouritesIcon content={movie} />;
      }}
    />,
    <PageTemplate
      key="upcoming"
      movieQuery={upcomingMoviesQuery}
      title="Coming Soon"
      action={(movie) => {
        return <AddToMustWatchIcon content={movie} />;
      }}
    />,
  ];

  return (
    <>
      <Panel>{discoverPanel}</Panel>
    </>
  );
};

export default MoviePage;
