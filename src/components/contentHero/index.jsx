import React, { useContext } from "react";
import findHero from "./findHero";
import { useState } from "react";
import Spinner from "../spinner";
import MovieHeroBar from "./contentHeroOverlay";
import { heroImageQuery } from "../../hooks/useMovieQueries";
import { Box } from "@mui/material";
import Fade from "@mui/material/Fade";

const styles = {
  box: (backgroundImage) => {
    return {
      borderRadius: 5,
      overflow: "hidden",
      zIndex: 1,
      display: "flex",
      position: "relative",
      width: "100",
      height: 400,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      cursor: "pointer",
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
        filter: "brightness(65%)",
      },
    };
  },
  heroBar: {
    display: "flex",
    flexDirection:"column",
    zIndex: 2,
    flex: 1,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function ContentHero({ movie }) {
  const { data, error, isLoading, isError } = heroImageQuery(movie);
  const [active, setActive] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const heroImage = data ? findHero(data.backdrops) : [];

  function handleMouseOver() {
    setActive(true);
  }

  function handleMouseOut() {
    setActive(false);
  }

  return (
    <>
      {heroImage && (
        <>
          <Box onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} sx={styles.box(`https://image.tmdb.org/t/p/original/${heroImage.file_path}`)}>
            <Fade timeout={{ enter: 150, exit: 300 }} in={active}>
              <Box sx={styles.heroBar}>
                <MovieHeroBar movie={movie} />
              </Box>
            </Fade>
          </Box>
        </>
      )}
    </>
  );
}
