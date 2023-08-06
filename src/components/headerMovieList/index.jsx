import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5,
  },
};


const Header = (props) => {
  
  const title = props.title;
  const components = props.components;
  const [pageNumber, setPageNumber] = useState(0);
  console.log(components[0].props.title)

  function handleArrowForward() {
    if (pageNumber < components.length - 1) {
      setPageNumber(pageNumber + 1 )
    } 
  }

  function handleArrowBackward() {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1 )
    }
  }

  return (
    <>
      <Paper component="div" sx={styles.root}>
        {components.length > 1 && (
          <IconButton onClick={handleArrowBackward} aria-label="go back">
            <ArrowBackIcon color="primary" fontSize="large" />
          </IconButton>
        )}

        <Typography variant="h4" component="h3">
          {components ? components[pageNumber].props.title : title}
        </Typography>

        {components.length > 1 && (
          <IconButton onClick={handleArrowForward} aria-label="go forward">
            <ArrowForwardIcon color="primary" fontSize="large" />
          </IconButton>
        )}
      </Paper>

      {components && components[pageNumber]}
    </>
  );
};

export default Header;
