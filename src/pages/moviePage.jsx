import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateContentListPage";
import Panel from "../components/contentPanel";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { discoverMoviesQuery, upcomingMoviesQuery, discoverGenreMoviesQuery } from "../hooks/useMovieQueries";
import { tmdbMovieGenres } from "../util";
import SearchForm from "../components/searchForm";
import SearchButton from "../components/searchForm/searchButton";

const MoviePage = (props) => {
  const discoverPanel = [
    <PageTemplate
      key="discover"
      query={(pageNumber) => {
        return discoverMoviesQuery(pageNumber);
      }}
      title="Discover Movies"
      action={(movie) => {
        return <AddToFavouritesIcon content={movie} />;
      }}
    />,
    <PageTemplate
      key="upcoming"
      query={(pageNumber) => {
        return upcomingMoviesQuery(pageNumber);
      }}
      title="Coming Soon"
      action={(movie) => {
        return <AddToMustWatchIcon content={movie} />;
      }}
    />,
  ];

  const genrePanel = () => {
    const genreList = [];

    for (const [key, value] of Object.entries(tmdbMovieGenres)) {
      genreList.push(
        <PageTemplate
          key={key}
          query={(pageNumber) => {
            return discoverGenreMoviesQuery(pageNumber, value);
          }}
          title={key}
          action={(movie) => {
            return <AddToFavouritesIcon content={movie} />;
          }}
        />
      );
    }
    return genreList;
  };

  return (
    <>
      <Panel>
        {discoverPanel}
        {genrePanel()}
      </Panel>
    </>
  );
};

export default MoviePage;
