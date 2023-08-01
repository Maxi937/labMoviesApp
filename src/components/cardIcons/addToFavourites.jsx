import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useSession from "../../hooks/useSession";
import { savefavourite } from "../../api/supabase-api";

const AddToFavouritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const [session] = useSession();

  const onUserSelect = (e) => {
    e.preventDefault();
    savefavourite()
    console.log(session.user.id)
    //context.addToFavourites(movie);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;