import React, { useState, useEffect } from "react";
import Spinner from "../spinner";
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieList from "../contentList";
import PageSwitcher from "./pageSwitcher";
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

function ContentListPageTemplate({ contentData, action, hero = false, setHero }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const genreId = Number(genreFilter);

  let contentHero;

  const { data, error, isLoading, isError, isPreviousData, isFetching, isSuccess } = contentData(pageNumber);
  const pages = data ? data.total_pages : 1;
  const content = data ? data.results : [];

  if (hero) {
    // Got an error when not using useEffect - I think because the setHero was being called before the Panel that impletements setHero was finished rendering
    useEffect(() => {
      contentHero = content.shift();
      setHero(contentHero);
    });
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
      <Fade in={isSuccess}>
        <Grid container sx={styles.root}>
          <Grid item container spacing={6}>
            <MovieList action={action} content={displayedContent} />
          </Grid>
        </Grid>
      </Fade>

      {pages > 1 && <PageSwitcher pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={pages} />}

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
