import React, { useState } from "react";
import Spinner from "../spinner";
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieList from "../contentList";
import MovieHero from "../movieHero";
import { Fade } from "@mui/material";
import Box from "@mui/material/Box";

const styles = {
  root: {
    padding: "50px",
  },
  hero: {
    margin: 2,
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

function ContentListPageTemplate({ movieQuery, title, action, hero = false }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data, error, isLoading, isError } = movieQuery();
  const content = data ? data.results : [];
  const genreId = Number(genreFilter);
  let contentHero;

  if (hero) {
    contentHero = content.shift();
    console.log(contentHero);
  }

  let displayedContent = content
    .filter((m) => {
      const title = m.title ? m.title : m.name;
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
      <Fade in={true}>
        <Box>
         {contentHero &&  <Box sx={styles.hero}><MovieHero movie={contentHero}/></Box>}
          <Grid container sx={styles.root}>
            <Grid item container spacing={6}>
              <MovieList action={action} content={displayedContent} />
            </Grid>
          </Grid>
        </Box>
      </Fade>

      <Fab color="secondary" variant="extended" onClick={() => setDrawerOpen(true)} sx={styles.fab}>
        Filter
      </Fab>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <FilterCard onUserInput={handleChange} titleFilter={titleFilter} genreFilter={genreFilter} />
      </Drawer>
    </>
  );
}
export default ContentListPageTemplate;
