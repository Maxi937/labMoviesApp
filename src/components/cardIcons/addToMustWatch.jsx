import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAdd from '@mui/icons-material/PlaylistAdd';
import PlaylistAddCheck  from "@mui/icons-material/PlaylistAddCheck";
import { UserContext } from "../../contexts/userContext";

const styles = {
  isMustWatch: {
    color: "rgb(3, 161, 252)"

  },
  notMustWatch: {
    color: "rgb(255, 255, 255)"
  }
}


const AddToMustWatchIcon = ({ content, size="large" }) => {
  const userContext = useContext(UserContext);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    userContext.addToMustWatch(content);
  };

  if (userContext.mustWatch.includes(content.id)) {
    return (
      <IconButton aria-label="add to favorites" onClick={handleClick}>
        <PlaylistAddCheck sx={styles.isMustWatch} fontSize={size} />
      </IconButton>
    );
  }

  return (
    <IconButton aria-label="add to Must Watch" onClick={handleClick}>
      <PlaylistAdd sx={styles.notMustWatch} color="primary" fontSize={size} />
    </IconButton>
  );
};

export default AddToMustWatchIcon;