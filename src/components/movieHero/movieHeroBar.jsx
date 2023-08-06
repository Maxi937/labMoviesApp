import React, { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Spinner from "../spinner";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddToFavouritesIcon from "../cardIcons/addToFavourites";
import { Box } from "@mui/material";
import PlaylistAdd from "@mui/icons-material/PlaylistAdd";
import { formatDate } from "../../util";
import { Star } from "@mui/icons-material";
import { Badge } from "@mui/icons-material";

const styles = {
  bottomBar: {
    display: "flex",
    marginTop: "auto",
    backgroundColor: "rgba(0,0,0,0.1)",
    color: "white",
    gap: 4,
    padding: 2,
  },
  bottomBarRight: {
    marginLeft: "auto",
  },
  top: {
    display: "flex",
    padding: 2,
    display: "flex",
  },
  topLeft: {
    alignItems: "baseline",
    display: "flex",
    display: "flex",
  },
  rightBar: {
    marginLeft: "auto",
    gap: 2,
    padding: 2,
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
  },
  star: {
    color: "yellow",
    fontSize: 50
  },
};

export default function MovieHeroBar({ movie }) {
  const userContext = useContext(UserContext);

  function handleAddToFavourite() {
    userContext.addToFavourites(movie);
  }

  function handleMustWatch() {
    userContext.addToMustWatch(movie);
  }

  return (
    <>
      <Box sx={styles.top}>
        <Box sx={styles.topLeft}>
          <Star sx={styles.star} />
          <Typography color="white" variant="h2" component="p">
            {movie.vote_average}
          </Typography>
        </Box>

        <Box sx={styles.rightBar}>
          <Link to={`/movies/${movie.id}`}>
            <Button variant="contained" size="small">
              More Info
            </Button>
          </Link>
          {userContext.user && (
            <>
              <Button onClick={handleAddToFavourite} variant="contained" size="small" endIcon={<FavoriteIcon />}>
                Favourite
              </Button>
              <Button onClick={handleMustWatch} variant="contained" size="small" endIcon={<PlaylistAdd />}>
                Must Watch
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Box sx={styles.bottomBar}>
        <Typography variant="h5" component="p">
          {movie.title}
        </Typography>
        <Typography sx={styles.bottomBarRight} variant="h5" component="p">
          {formatDate(movie.release_date, "Do MMMM YYYY")}
        </Typography>
      </Box>
    </>
  );
}
