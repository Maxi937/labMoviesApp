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
      contentData={(pageNumber) => {
        return discoverMoviesQuery(pageNumber);
      }}
      title="Discover Movies"
      action={(movie) => {
        return <AddToFavouritesIcon content={movie} />;
      }}
    />,
    <PageTemplate
      key="upcoming"
      contentData={(pageNumber) => {
        return upcomingMoviesQuery(pageNumber)
      }}
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
