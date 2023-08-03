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
import { UserContext } from "../../contexts/userContext";

const styles = {
  card: { 
    maxWidth: 300 
},
  media: {
    marginTop: 2,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 50,
    width: 150,
    height: 150,
  },
};

export default function ActorCard({ actor }) {
  return (
    <Card sx={styles.card}>
      <CardMedia sx={styles.media} image={actor.profile_path ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` : img}></CardMedia>
      <CardContent>
          <Grid item xs={12}>
            <Typography variant="h6" component="p">
                {actor.character}
            </Typography>
            <Typography variant="body1" component="p">
                {actor.name}
            </Typography>
          </Grid>
      </CardContent>
    </Card>
  );
}
