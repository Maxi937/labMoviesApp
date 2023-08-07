import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateContentListPage";
import Panel from "../components/contentPanel";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { discoverTelevisionQuery, upcomingMoviesQuery } from "../hooks/useMovieQueries";

const TelevisionPage = (props) => {
  return (
    <Panel>
      {[
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
      ]}
    </Panel>
  );
};

export default TelevisionPage;
