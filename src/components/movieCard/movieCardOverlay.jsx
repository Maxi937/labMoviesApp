import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { Star } from "@mui/icons-material";

const styles = {
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  bottomBar: {
    display: "flex",
    justifyContent: "center",
    marginTop: "auto",
    color: "white",
    padding: 2,
  },
  bottomBarRight: {
    marginLeft: "auto",
  },
  topBar: {
    display: "flex",
  },
  topLeft: {
    padding: 2,
    alignItems: "baseline",
    display: "flex",
  },
  topRight: {
    marginLeft: "auto",
    gap: 2,
    display: "flex",
    textAlign: "center",
  },
  star: {
    color: "yellow",
    fontSize: 15,
  },
};

export default function MovieCardOverlay({ movie, action }) {
  const { favourites, mustWatch } = useContext(UserContext);

  if (favourites) {
    if (favourites.find((id) => id === movie.id)) {
      movie.favourite = true;
    } else {
      movie.favourite = false;
    }
  }

  if (mustWatch.find((id) => id === movie.id)) {
    movie.mustWatch = true;
  } else {
    movie.mustWatch = false;
  }

  return (
    <>
      <Box sx={styles.topBar}>
        <Box sx={styles.topLeft}>
          <Star sx={styles.star} />
          <Typography color="white" variant="h6" component="p">
            {movie.vote_average}
          </Typography>
        </Box>
        <Box sx={styles.topRight}>
            {action(movie)}
        </Box>
      </Box>
      <Box sx={styles.bottomBar}>
        <Typography variant="h6" component="p">
          {movie.title ? movie.title : movie.name}
        </Typography>
      </Box>
    </>
  );
}
