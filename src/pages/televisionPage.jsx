import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateContentListPage";
import Panel from "../components/contentPanel";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { discoverTelevisionQuery, upcomingMoviesQuery, discoverGenreTelevisionQuery } from "../hooks/useMovieQueries";
import { tmdbTvGenres } from "../util";

const TelevisionPage = (props) => {
  const discoverPanel = [
    <PageTemplate
      key={"television"}
      contentData={(pageNumber) => {
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
          contentData={(pageNumber) => {
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
      <Panel>{discoverPanel}</Panel>
      <Panel>{genrePanel()}</Panel>
    </>
  );
};

export default TelevisionPage;
