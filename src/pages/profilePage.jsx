import React, { useState, useEffect, useContext } from "react";
import PageTemplate from "../components/templateContentListPage";
import Panel from "../components/contentPanel";
import { getMovieQuery, getProfileContentQueryTest } from "../hooks/useMovieQueries";
import AddActorToFavouritesIcon from "../components/cardIcons/addActorToFavourites";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { UserContext } from "../contexts/userContext";
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

  if (isLoading) {
    return <Spinner />;
  }

  const favourites = [
    <ContentSlider
      title="Favourite Movies"
      content={profileContentQuery.movieFavourites.map((q) => q.data)}
      action={(movie) => {
        return <AddToFavouritesIcon content={movie} />;
      }}
    />,
    <ContentSlider
      title="Favourite Tv Shows"
      content={profileContentQuery.tvFavourites.map((q) => q.data)}
      action={(movie) => {
        return <AddToFavouritesIcon content={movie} />;
      }}
    />,
    <ContentSlider
    title="Favourite Actors"
    content={profileContentQuery.actorFavourites.map((q) => q.data)}
    action={(actor) => {
      return <AddActorToFavouritesIcon actor={actor} />;
    }}
  />
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
      console.log(f)
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

  //const mustWatchTv = profileContentQuery.mustWatchTv.map((q) => q.data);

  return (
    <>
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
