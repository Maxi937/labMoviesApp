import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { UserContext } from "../../contexts/userContext";
import { MovieCreation } from "@mui/icons-material";

const styles = {
  icon: {
    color: "rgb(3, 161, 252)",
  },
};

const CreateAMovieIcon = ({size}) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/movie/form")
  };

  return (
    <IconButton aria-label="createMovie" onClick={handleClick}>
      <MovieCreation sx={styles.icon} fontSize={size} />
    </IconButton>
  );
};

export default CreateAMovieIcon;
