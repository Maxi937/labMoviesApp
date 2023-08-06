import React, { useContext } from "react";
import findHero from "./findHero";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Slide from "@mui/material/Slide";
import Spinner from "../spinner";
import MovieHeroBar from "./movieHeroBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { heroMovieImageQuery, heroMovieQuery } from "../../hooks/useMovieQueries";
import { Box } from "@mui/material";
import Fade from "@mui/material/Fade";

const styles = {
  box: (backgroundImage) => {
    return {
      overflow: "hidden",
      zIndex: 1,
      display: "flex",
      position: "relative",
      width: "100",
      height: 400,
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

export default function MovieHero({ movie }) {
  const { favourites, mustWatch } = useContext(UserContext);
  const { data, error, isLoading, isError } = heroMovieImageQuery(movie);
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
