import React, { useState } from "react";
import Spinner from "../spinner"
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieList from "../movieList";
import MovieHero from "../movieHero";

const styles = {
  root: {
    padding: "20px",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

function MovieListPageTemplate({movieQuery, title, action, hero = false }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data, error, isLoading, isError } = movieQuery()
  const movies = data ? data.results : [];
  const genreId = Number(genreFilter);
  let movieHero = {}

  if(hero) {
    movieHero = movies.shift()
  }

  let displayedMovies = movies
    .filter((m) => {
      const title = m.title ? m.title : m.name
      return title.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "title") setTitleFilter(value);
    else setGenreFilter(value);
  };

  if (isLoading) {
    return <Spinner />;
  } 

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      { hero && (<MovieHero movie={movieHero}/>)}
      <Grid container sx={styles.root}>
        <Grid item container spacing={5}>
          <MovieList action={action} movies={displayedMovies} />
        </Grid>
      </Grid>
      <Fab color="secondary" variant="extended" onClick={() => setDrawerOpen(true)} sx={styles.fab}>
        Filter
      </Fab>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <FilterCard onUserInput={handleChange} titleFilter={titleFilter} genreFilter={genreFilter} />
      </Drawer>
    </>
  );
}
export default MovieListPageTemplate;
