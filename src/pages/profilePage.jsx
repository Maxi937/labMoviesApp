import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import Panel from "../components/contentPanel";
import { getMoviesQuery, getTvQuery, getMovieQuery, getProfileContentQueryTest } from "../hooks/useMovieQueries";
import AddActorToFavouritesIcon from "../components/cardIcons/addActorToFavourites";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { UserContext } from "../contexts/userContext";
import Spinner from "../components/spinner";
import ContentSlider from "../components/contentSlider";
import { Typography } from "@mui/material";
import CreateAMovieIcon from "../components/createMovie";
import ContentListPageTemplate from "../components/templateContentListPage";
import EditMovieIcon from "../components/cardIcons/editMovie";
import CastCharactersIcon from "../components/cardIcons/castCharacters";

const ProfilePage = (props) => {
  const context = useContext(UserContext);
  const profileContentQuery = getProfileContentQueryTest(context);
  const userMovies = context.userMovies;
  let isLoading;
  let isSuccess;

  if (!profileContentQuery) {
    return <Spinner />;
  }

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

  const favourites = [
    <ContentSlider
      key="Favourite Movies"
      title="Favourite Movies"
      content={profileContentQuery.movieFavourites.map((q) => q.data)}
      action={(movie) => {
        return <AddToFavouritesIcon content={movie} />;
      }}
    />,
    <ContentSlider
      key="Favourite Tv Shows"
      title="Favourite Tv Shows"
      content={profileContentQuery.tvFavourites.map((q) => q.data)}
      action={(movie) => {
        return <AddToFavouritesIcon content={movie} />;
      }}
    />,
    <ContentSlider
      key="Favourite Actors"
      title="Favourite Actors"
      content={profileContentQuery.actorFavourites.map((q) => q.data)}
      action={(actor) => {
        return <AddActorToFavouritesIcon actor={actor} />;
      }}
    />,
  ];

  const playlists = [
    <ContentSlider
      key="Must Watch Moves"
      title="Must Watch Movies"
      content={profileContentQuery.mustWatchMovies.map((q) => q.data)}
      action={(movie) => {
        return <AddToMustWatchIcon content={movie} />;
      }}
    />,
  ];

  const favouritesToDisplay = () =>
    favourites.map((f) => {
      if (f.props.content.length > 0) {
        return f;
      }
    });

  const playListsToDisplay = () =>
    playlists.map((p) => {
      if (p.props.content.length > 0) {
        return p;
      }
    });

  return (
    <>
      <Box>
        <Typography variant="h4" component="h3">
          Welcome {context.user.user_metadata.firstName}
        </Typography>
      </Box>
      <Box sx={{ diplay: "flex", flex: 1 }}>
        <Typography variant="h6" component="h3">
          Create A Movie
          <CreateAMovieIcon size="large" />
        </Typography>

        <ContentListPageTemplate
          content={userMovies}
          action={(movie) => {
            return <CastCharactersIcon movie={movie} />;
          }}
        />
      </Box>

      <Panel>{favouritesToDisplay()}</Panel>
      <Panel>{playListsToDisplay()}</Panel>
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
