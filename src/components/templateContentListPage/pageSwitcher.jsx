import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import { Box } from "@mui/material";
import ContentHero from "../contentHero";
import { cloneElement } from "react";

const styles = {
  header: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 10,
  },
};

const PageSwitcher = ({ pageNumber, setPageNumber, numberOfPages }) => {
  function handleArrowForward() {
    if (pageNumber < numberOfPages) {
      setPageNumber(pageNumber + 1);
    }
  }

  function handleArrowBackward() {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  }

  return (
    <>
      <Box sx={styles.header}>
        <IconButton onClick={handleArrowBackward} aria-label="go back">
          <ArrowBackIcon color="primary" fontSize="large" />
        </IconButton>

        <Typography variant="h4" component="h3">
          {pageNumber}
        </Typography>

        <IconButton onClick={handleArrowForward} aria-label="go forward">
          <ArrowForwardIcon color="primary" fontSize="large" />
        </IconButton>

        total {numberOfPages}
      </Box>
    </>
  );
};

export default PageSwitcher;
