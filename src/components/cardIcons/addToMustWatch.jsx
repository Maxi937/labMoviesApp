import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const AddToMustWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addToMustWatch(movie);
  };
  return (
    <IconButton aria-label="add to Must Watch" onClick={onUserSelect}>
      <PlaylistAddCheckIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;