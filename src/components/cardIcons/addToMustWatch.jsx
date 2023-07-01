import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAdd from '@mui/icons-material/PlaylistAdd';

const AddToMustWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addToMustWatch(movie);
  };
  return (
    <IconButton aria-label="add to Must Watch" onClick={onUserSelect}>
      <PlaylistAdd color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;