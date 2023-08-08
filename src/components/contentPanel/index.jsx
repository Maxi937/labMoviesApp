import React, { useState } from "react";
import { Children } from "react";
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
  root: {
    margin: 5,
  },
  header: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 10,
  },
};

const ContentPanel = ({ children }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const pages = Children.toArray(children);

  function handleArrowForward() {
    if (pageNumber < pages.length - 1) {
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
      <Paper component="div" sx={styles.root}>
        <Box sx={styles.header}>
          {pages.length > 1 && (
            <IconButton onClick={handleArrowBackward} aria-label="go back">
              <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>
          )}

          <Typography variant="h4" component="h3">
            {pages[pageNumber].props.title}
          </Typography>

          {pages.length > 1 && (
            <IconButton onClick={handleArrowForward} aria-label="go forward">
              <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
          )}
        </Box>
        {cloneElement(pages[pageNumber])}
      </Paper>
    </>
  );
};

export default ContentPanel;
