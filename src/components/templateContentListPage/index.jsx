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
import ContentHero from "../contentHero";

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

function ContentListPageTemplate({ query, content, action, hero = false }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const genreId = Number(genreFilter);
  let pages

  if (query) {
    const contentQuery = query(pageNumber);

    if (contentQuery.isLoading) {
      return <Spinner />;
    }

    if (contentQuery.isError) {
      return <h1>{error.message}</h1>;
    }
    content = contentQuery.data ? contentQuery.data.results : []
    pages = "total_pages" in contentQuery.data ? contentQuery.data.total_pages : 1;
  }

  if(!content || !content[0] ) {
    return
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

  return (
    <>
      <Fade in={true}>
        <Box>
          {hero && (
            <Box sx={styles.hero}>
              <ContentHero movie={displayedContent.shift()} />
            </Box>
          )}
          <Grid container sx={styles.root}>
            <Grid item container spacing={6}>
              <MovieList action={action} content={displayedContent} />
            </Grid>
          </Grid>
        </Box>
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
