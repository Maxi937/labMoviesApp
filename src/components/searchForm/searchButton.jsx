import React, { useState, useEffect } from "react";
import Spinner from "../spinner";
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import { Drawer } from "@mui/material";
import SearchForm from ".";

const styles = {
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 100,
  },
};

const SearchButton = ({ contentType }) => {
    console.log(contentType)
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <SearchForm contentType={contentType} setDrawerOpen={setDrawerOpen}/>
      </Drawer>
      <Fab color="secondary" variant="extended" onClick={() => setDrawerOpen(true)} sx={styles.fab}>
        Search
      </Fab>
    </>
  );
};

export default SearchButton;

