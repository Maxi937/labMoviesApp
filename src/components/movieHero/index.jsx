import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Spinner from "../spinner";
import { Box } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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
import { MoviesContext } from "../../contexts/moviesContext";
import { UserContext } from "../../contexts/userContext";

const styles = {
  box: {
    height: 300,
  },
  card: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  media: {
    margin: 2,
    objectFit: "fill",
    height: 150,
    width: "auto"
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  movieTitle: {
    display: "none",
    color: "white",
    zIndex: -1,
    position: "absolute",
    marginTop: -25,
    zIndex: 20,
    textAlign: "center",
  },
};

export default function MovieHero({ movieQuery }) {
  const { favourites, mustWatch } = useContext(UserContext);
  const { data, error, isLoading, isError } = movieQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movie = data ? data.results[0] : [];

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
    <Card sx={styles.card}>
      <CardMedia component="img" sx={styles.media} image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img}></CardMedia>
      <Typography sx={styles.movieTitle} variant="h5" component="p">
        {movie.title}{" "}
      </Typography>
      <CardActions disableSpacing>
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
