import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";

const styles = {
  avatar: {
    backgroundColor: "rgb(256, 0, 0)",
  },
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
};

const MovieHeader = (props) => {
  const movie = props.movie;
  const context = useContext(MoviesContext);

  const displayContextIcon = () => {
    if (context.favourites.includes(movie.id)) {
      return (
        <Avatar sx={styles.avatar}>
          <FavoriteIcon />
        </Avatar>
      );
    } else if (context.mustWatch.includes(movie.id)) {
      return (
        <Avatar sx={styles.avatar}>
          <PlaylistAddCheckIcon />
        </Avatar>
      );
    }
  };

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      {context ? displayContextIcon() : null}

      <Typography variant="h4" component="h3">
        {movie.title}
        {"   "}
        <a href={movie.homepage}>
          <HomeIcon color="primary" fontSize="='large" />
        </a>
        <br />
        <span>{`${movie.tagline}`} </span>
      </Typography>
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
