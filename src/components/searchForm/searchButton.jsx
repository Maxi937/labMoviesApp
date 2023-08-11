import React, { useState, useEffect } from "react";
import Spinner from "../spinner";
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";


const styles = {
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

const SearchButton = ({ movie }) => {
  return (
    <Fab color="secondary" variant="extended" onClick={() => setDrawerOpen(true)} sx={styles.fab}>
      Filter
    </Fab>
  );
};

export default SearchButton;
