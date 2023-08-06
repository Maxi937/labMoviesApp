import React, { useContext } from "react";
import { Box } from "@mui/material";
import ContentCardOverlay from "./contentCardOverlay";
import Fade from "@mui/material/Fade";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  box: (backgroundImage) => {
    return {
      borderRadius: 5,
      boxShadow: 5,
      overflow: "hidden",
      zIndex: 1,
      display: "flex",
      position: "relative",
      width: 200,
      height: 300,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      "&::before": {
        content: `""`,
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transition: "filter 0.3s ease 0s",
      },
      "&:hover:before": {
        filter: "brightness(75%)",
      },
    };
  },
  overlay: {
    display: "flex",
    flexDirection: "column",
    zIndex: 5,
    flex: 1,
    "&:hover": {
      cursor: "pointer",
    },

  },
};

export default function ContentCard({ content, action }) {
  const navigate = useNavigate()
  const [active, setActive] = useState(false);

  function handleMouseOver() {
    setActive(true);
  }

  function handleMouseOut() {
    setActive(false);
  }

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation()
    content.first_air_date ?  navigate(`/tv/${content.id}`) : navigate(`/movies/${content.id}`)
  }

  return (
    <>
      <Box onClick={handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} sx={styles.box(`https://image.tmdb.org/t/p/w500/${content.poster_path}`)}>
        <Fade timeout={{ enter: 150, exit: 300 }} in={active}>
          <Box sx={styles.overlay}>
            <ContentCardOverlay content={content} action={action} />
          </Box>
        </Fade>
      </Box>
    </>
  );
}
