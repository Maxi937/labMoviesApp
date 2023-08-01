import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { UserContext } from "../../contexts/userContext";

const AddToFavouritesIcon = ({ movie }) => {
  const userContext = useContext(UserContext)

  const onUserSelect = (e) => {
    e.preventDefault();
    userContext.addToFavourites(movie)
  };

  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;