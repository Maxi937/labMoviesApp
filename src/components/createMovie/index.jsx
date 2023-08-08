import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { UserContext } from "../../contexts/userContext";
import { MovieCreation, MovieCreationOutlined } from "@mui/icons-material";

const styles = {
  icon: {
    color: "rgb(3, 161, 252)",
  },
};

const CreateAMovieIcon = ({size}) => {
  const userContext = useContext(UserContext);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
  };

  return (
    <IconButton aria-label="createMovie" onClick={handleClick}>
      <MovieCreation sx={styles.icon} fontSize={size} />
    </IconButton>
  );
};

export default CreateAMovieIcon;
