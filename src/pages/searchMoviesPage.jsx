import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateContentListPage";
import Panel from "../components/contentPanel";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { discoverMoviesQuery, upcomingMoviesQuery, discoverGenreMoviesQuery } from "../hooks/useMovieQueries";
import { tmdbMovieGenres } from "../util";
import SearchForm from "../components/searchForm";
import SearchButton from "../components/searchForm/searchButton";
import { useParams } from "react-router";
import { searchMoviesQuery } from "../hooks/useMovieQueries";

const SearchMoviesPage = () => {
  const { searchQuery } = useParams();

  const searchPanel = [
    <PageTemplate
      key="search"
      query={(pageNumber) => {
        return searchMoviesQuery(pageNumber, searchQuery);
      }}
      title={`Results for ${searchQuery}`}
      action={(movie) => {
        return <AddToFavouritesIcon content={movie} />;
      }}
    />,
  ];

  return (
    <>
      <SearchButton contentType={"movie"}/>
      <Panel>{searchPanel}</Panel>
    </>
  );
};

export default SearchMoviesPage;
