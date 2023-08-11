import React, { useState, useEffect } from "react";
import { getMovieCredits } from "../../api/tmdb-api.js";
import { useQueries, useQuery } from "react-query";
import Spinner from "../spinner/index.jsx";
import Typography from "@mui/material/Typography";
import CastList from "./castList.jsx";
import { Box } from "@mui/material";
import { getCharacters, getUserCredits } from "../../api/supabase-api.js";
import { getActor } from "../../api/tmdb-api.js";

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

const UserMovieCredits = ({ movie }) => {
  // use query with placeholder data - done this way to avoid credits being undefined on initial render
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const currentCast = await getUserCredits(movie.id);
      setCast(currentCast);
    };
    fetchCast();
  }, []); // <-

  const actorQueries = useQueries(
    cast.map((character) => {
      return {
        queryKey: ["movie", character],
        queryFn: async () => getActor(character.actor),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = actorQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const actors = actorQueries.map((q) => q.data);

  actors.map((a) => {
    cast.map((c) => {
      if (a.id === c.actor) {
        return (a.character = c.name);
      }
    });
  });

  return (
    <>
      {cast ? (
        <>
          <Typography variant="h5" component="h3">
            Cast
          </Typography>
          <Box>
            <CastList castList={actors} />
          </Box>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default UserMovieCredits;
