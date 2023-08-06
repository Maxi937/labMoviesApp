import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { MoviesContext } from "../../contexts/moviesContext";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import GoToContentHomepage from "../cardIcons/goToContentHomepage";

const styles = {
  avatar: {
    backgroundColor: "rgb(256, 0, 0)",
  },
  root: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  barLeft: {},
  barMiddle: {
    marginRight: "auto",
    marginLeft: "auto",
    textAlign: "center",
  },
};

const ContentHeader = ({ content }) => {
  return (
    <Paper component="div" sx={styles.root}>
      <Box sx={styles.barLeft}>
        <GoToContentHomepage content={content} />
      </Box>

      <Box sx={styles.barMiddle}>
        <Typography variant="h4" component="h3">
          {content.title ? content.title : content.name}
        </Typography>
        <Typography variant="h7" component="h3">
          {content.tagline}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ContentHeader;
