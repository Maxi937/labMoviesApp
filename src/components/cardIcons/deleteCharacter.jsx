import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCharacter } from "../../api/supabase-api";
import { useNavigate } from "react-router-dom";

const DeleteCharacterIcon = ({ actor, state}) => {
const navigate = useNavigate()
  const onUserRequest = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteCharacter(actor.characterId)
    return state.refetch()
  };

  return (
    <IconButton aria-label="remove from favorites" onClick={onUserRequest}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default DeleteCharacterIcon;
