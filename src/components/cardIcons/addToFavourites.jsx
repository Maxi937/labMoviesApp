import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { UserContext } from "../../contexts/userContext";

const styles = {
  isFavourite: {
    color: "rgb(255, 0, 0)"

  },
  notFavourite: {
    color: "rgb(255, 255, 255)"
  }
}


const AddToFavouritesIcon = ({ movie, size = "large" }) => {
  const userContext = useContext(UserContext);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    userContext.addToFavourites(movie);
  };

  if (userContext.favourites.includes(movie.id)) {
    return (
      <IconButton aria-label="add to favorites" onClick={handleClick}>
        <FavoriteIcon sx={styles.isFavourite} fontSize={size} />
      </IconButton>
    );
  }

  return (
    <IconButton aria-label="favourite" onClick={handleClick}>
      <FavoriteBorder sx={styles.notFavourite} fontSize={size} />
    </IconButton>
  );
};

export default AddToFavouritesIcon;
