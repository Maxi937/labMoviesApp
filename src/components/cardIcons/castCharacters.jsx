import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

const styles = {
  notFavourite: {
    color: "rgb(3, 161, 252)",
  },
};

const CastCharactersIcon = ({ movie, size = "large" }) => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/usermovies/${movie.id}/characters`)  
  };

  return (
    <IconButton aria-label="favourite" onClick={handleClick}>
      <VideoCameraFrontIcon sx={styles.notFavourite} fontSize={size} />
    </IconButton>
  );
};

export default CastCharactersIcon;
