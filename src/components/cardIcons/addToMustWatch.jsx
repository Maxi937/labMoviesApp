import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAdd from '@mui/icons-material/PlaylistAdd';
import { UserContext } from "../../contexts/userContext";

const AddToMustWatchIcon = ({ movie }) => {
  const { addToMustWatch } = useContext(UserContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    addToMustWatch(movie);
  };
  return (
    <IconButton aria-label="add to Must Watch" onClick={onUserSelect}>
      <PlaylistAdd color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;