import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
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
  card: { maxWidth: 300 },
  media: {
    "&:hover": {
      color: "red",
      filter: "brightness(30%)",
      "& ~ ${movieTitle}": {
        color: "red",
        display: "block",
      },
    },
    zIndex: 10,
    height: 300,
    objectFit: "contain",
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

export default function MovieCard({ movie, action }) {
  const { favourites } = useContext(UserContext);
  const { mustWatch } = useContext(MoviesContext);

  if(favourites) {
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
      <CardHeader
        sx={styles.header}
        avatar={
          movie.mustWatch ? (
            <Avatar sx={styles.avatar}>
              <PlaylistAddCheckIcon />
            </Avatar>
          ) : movie.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
      />
      <CardMedia sx={styles.media} image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img}></CardMedia>
      <Typography sx={styles.movieTitle} variant="h5" component="p">
        {movie.title}{" "}
      </Typography>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
