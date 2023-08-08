import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { UserContext } from "../../contexts/userContext";

const styles = {
  isFavourite: {
    color: "rgb(255, 0, 0)",
  },
  notFavourite: {
    color: "rgb(255, 255, 255)",
  },
};

const EditMovieIcon = ({ movie, size = "large" }) => {
  const userContext = useContext(UserContext);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("edit movie")   
  };

  return (
    <IconButton aria-label="favourite" onClick={handleClick}>
      <FavoriteBorder sx={styles.notFavourite} fontSize={size} />
    </IconButton>
  );
};

export default EditMovieIcon;
