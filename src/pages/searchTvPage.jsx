import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateContentListPage";
import Panel from "../components/contentPanel";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import SearchButton from "../components/searchForm/searchButton";
import { useParams } from "react-router";
import { searchTvQuery } from "../hooks/useMovieQueries";

const SearchTvPage = () => {
  const { searchQuery } = useParams();

  const searchPanel = [
    <PageTemplate
      key="search"
      query={(pageNumber) => {
        return searchTvQuery(pageNumber, searchQuery);
      }}
      title={`Results for ${searchQuery}`}
      action={(movie) => {
        return <AddToFavouritesIcon content={movie} />;
      }}
    />,
  ];

  return (
    <>
      <SearchButton contentType={"tv"}/>
      <Panel>{searchPanel}</Panel>
    </>
  );
};

export default SearchTvPage;
