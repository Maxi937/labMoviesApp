import React from "react";
import { getMovieCredits } from "../../api/tmdb-api.js";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";
import CastList from "./castList.jsx";
import { Box } from "@mui/material";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  fab: {
    position: "fixed",
    top: 80,
    right: 2,
  },
};

const MovieCredits = ({ movie }) => {
  // use query with placeholder data - done this way to avoid credits being undefined on initial render
  const {
    data: credits,
    error,
    isLoading,
    isError,
  } = useQuery(["credits", movie.id], async () => getMovieCredits(movie.id), {
    placeholderData: {
      cast: [],
      crew: [],
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {credits ? (
        <>
          <Typography variant="h5" component="h3">
            Cast
          </Typography>
          <Box>
            <CastList castList={credits.cast} />
          </Box>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieCredits;
