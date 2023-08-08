import React, { useState, useEffect, useContext } from "react";
import PageTemplate from "../components/templateContentListPage";
import Panel from "../components/contentPanel";
import { getMovieQuery, getProfileContentQueryTest } from "../hooks/useMovieQueries";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { UserContext } from "../contexts/userContext";
import { useQueries } from "react-query";
import ContentList from "../components/contentList";
import Spinner from "../components/spinner";
import ContentSlider from "../components/contentSlider";

const ProfilePage = (props) => {
  const context = useContext(UserContext);

  const profileContentQuery = getProfileContentQueryTest(context);

  let isLoading;
  let isSuccess;

  // Check if any of the queries is still loading.
  for (const [key, query] of Object.entries(profileContentQuery)) {
    query.find((m) => {
      isLoading = m.isLoading;
      isSuccess = m.isSuccess;
    });
  }

  if (isLoading || !isSuccess) {
    return <Spinner />;
  }

  const movieFavourites = (
    <ContentSlider
      title="Favourite Movies"
      content={profileContentQuery.movieFavourites.map((q) => q.data)}
      action={(movie) => {
        return <AddToFavouritesIcon content={movie} />;
      }}
    />
  );

  const tvFavourites = (
    <ContentSlider
      title="Favourite Tv Shows"
      content={profileContentQuery.tvFavourites.map((q) => q.data)}
      action={(movie) => {
        return <AddToFavouritesIcon content={movie} />;
      }}
    />
  );

  const mustWatchTv = profileContentQuery.mustWatchTv.map((q) => q.data);
  const mustWatchMovies = profileContentQuery.mustWatchMovies.map((q) => q.data);

  return <>
  

  <Panel>
  {movieFavourites}
    {tvFavourites}
  </Panel>
  
  </>;
};

export default ProfilePage;

// const favouriteMovieQueries = useQueries(
//     favourites.map((movieId) => {
//       return {
//         queryKey: ["movie", movieId ],
//         queryFn: async () => getMovie(movieId),
//       };
//     })
//   );
