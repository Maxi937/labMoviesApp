import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateContentListPage";
import Panel from "../components/contentPanel";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import SearchButton from "../components/searchForm/searchButton";
import { discoverTelevisionQuery, upcomingMoviesQuery, discoverGenreTelevisionQuery } from "../hooks/useMovieQueries";
import { tmdbTvGenres } from "../util";

const TelevisionPage = (props) => {
  const discoverPanel = [
    <PageTemplate
      key={"television"}
      query={(pageNumber) => {
        return discoverTelevisionQuery(pageNumber);
      }}
      title="Discover Television Shows"
      action={(movie) => {
        return <AddToFavouritesIcon content={movie} />;
      }}
    />,
  ];

  const genrePanel = () => {
    const genreList = [];

    for (const [key, value] of Object.entries(tmdbTvGenres)) {
      genreList.push(
        <PageTemplate
          key={key}
          query={(pageNumber) => {
            return discoverGenreTelevisionQuery(pageNumber, value);
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
    <SearchButton contentType={"tv"}/>
      <Panel>
        {discoverPanel}
        {genrePanel()}
      </Panel>
    </>
  );
};

export default TelevisionPage;
