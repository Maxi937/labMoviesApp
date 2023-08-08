import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Spinner from "../spinner";
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import ContentCard from "../contentCard";
import { Fade } from "@mui/material";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const styles = {
  container: {
    overflow: "hidden",
  },
  root: {
    display: "flex",
    flexDirection: "row",
  },
  item: (index, sliderPosition) => {
    return {
      transform: `translateX(${10 * (index - sliderPosition)}%)`,
    };
  },

  slider: (contentLength) => {
    if (contentLength > 10) {
      return {
        display: "flex",
        marginLeft: "95%",
      };
    } else {
      return {
        visibility: "hidden",
      };
    }
  },
};

function ContentSlider({ content, action, title, displayTitle = false }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sliderPosition, setsliderPosition] = useState(-5);
  const genreId = Number(genreFilter);

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

  function handleArrowForward() {
    if (sliderPosition < content.length * 10) {
      setsliderPosition(sliderPosition + 2);
    }
  }

  function handleArrowBackward() {
    if (sliderPosition > -1) {
      setsliderPosition(sliderPosition - 2);
    }
  }

  const sliderContent = displayedContent.map((c, index) => {
    return (
      <Box key={("container", c.id)} sx={styles.item(index, sliderPosition)}>
        <ContentCard key={c.id} content={c} action={action} />
      </Box>
    );
  });

  return (
    <>
      <Paper sx={styles.container}>
        <Typography variant="h4" component="h3">
          {displayTitle && title}
        </Typography>
        <Box sx={styles.root}>{sliderContent}</Box>

        <Box sx={styles.slider(content.length)}>
          <IconButton onMouseDown={handleArrowBackward} onClick={handleArrowBackward} aria-label="go back">
            <ArrowBackIcon color="primary" fontSize="large" />
          </IconButton>
          <IconButton onMouseDown={handleArrowForward} onClick={handleArrowForward} aria-label="go forward">
            <ArrowForwardIcon color="primary" fontSize="large" />
          </IconButton>
          {/* {sliderPosition} */}
        </Box>
      </Paper>
    </>
  );
}

export default ContentSlider;
