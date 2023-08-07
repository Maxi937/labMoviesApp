import React, { useState, useEffect, useContext } from "react";
import PageTemplate from "../components/templateContentListPage";
import Panel from "../components/contentPanel";
import { getMovieQuery, getProfileContentQuery } from "../hooks/useMovieQueries";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { UserContext } from "../contexts/userContext";
import { useQueries } from "react-query";
import { Box } from "@mui/material";
import Spinner from "../components/spinner";

const ProfilePage = (props) => {
  const context = useContext(UserContext);

  const profileContentQuery = getProfileContentQuery(context);

  // Check if any of the parallel queries is still loading.
  const isLoading = profileContentQuery.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = profileContentQuery.map((q) => q.data);

  return (
    <>
      <Box>hello</Box>
    </>
  );
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
