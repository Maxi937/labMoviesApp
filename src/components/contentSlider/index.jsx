import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import ContentCard from "../contentCard";
import ActorCard from "../actorCard";
import { Fade } from "@mui/material";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    overflow: "hidden",
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
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
        margin: "auto",
      };
    } else {
      return {
        visibility: "hidden",
      };
    }
  },
};

function ContentSlider({ content, action, title, displayTitle = false }) {
  const [sliderPosition, setsliderPosition] = useState(-5);

  if (!content[0]) {
    console.log("no content");
    return;
  }

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

  const sliderContent = content.map((c, index) => {
    return (
      <Box key={("container", c.id)} sx={styles.item(index, sliderPosition)}>
        {c && "gender" in c ? <ActorCard key={("actor", c.id)} actor={c} action={action} /> : <ContentCard key={("content", c.id)} content={c} action={action} />}
      </Box>
    );
  });

  return (
    <>
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
    </>
  );
}

export default ContentSlider;
