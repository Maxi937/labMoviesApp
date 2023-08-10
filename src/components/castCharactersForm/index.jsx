import React, { useContext, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext.jsx";
import styles from "./styles.js";
import ActorPicker from "./actorPicker.jsx";
import Paper from "@mui/material/Paper";
import CastList from "./castList.jsx";

const CastCharacterForm = ({ favouriteActors }) => {
  const [actor, setActor] = useState({});
  const [cast, setCast] = useState([]);

  const defaultValues = {
    characterName: "",
  };

  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(defaultValues);

  const navigate = useNavigate();
  const context = useContext(UserContext);

  function handleActorChange(actor) {
    setActor(actor);
  }

  async function onSubmit(character) {
    character.actor = actor;

    const castList = [...cast];

    castList.map((c, index) => {
      if (c.actor.id === character.actor.id) {
        castList.splice(index, 1)
      }
    });

    castList.push(character);
    return setCast(castList);
  }

  return (
    <>
      <Box component="div" sx={styles.root}>
        <Box sx={styles.left}>
          <Typography component="h2" variant="h3" sx={styles.formHeaders}>
            Cast a Character
          </Typography>
          {errors.login && (
            <Alert severity="error">
              <AlertTitle>I'm Sorry</AlertTitle>
              <strong>{errors.login.message}</strong>
            </Alert>
          )}

          <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField variant="outlined" margin="normal" required onChange={onChange} value={value} id="name" label="Character Name" autoFocus />
              )}
            />
            {errors.name && (
              <Typography variant="h6" component="p">
                {errors.name.message}
              </Typography>
            )}

            <Typography variant="h6" component="p">
              Actor
            </Typography>

            <Paper sx={styles.actorPicker}>
              <ActorPicker selected={actor} actors={favouriteActors} overrideClick={handleActorChange} />
            </Paper>

            <Box sx={styles.buttons}>
              <Button type="submit" color="primary" sx={styles.submit}>
                Cast
              </Button>
            </Box>
          </form>
        </Box>
        {cast.length >= 1 && (
          <Box sx={styles.castListContainer}>
            <Box sx={styles.castList}>
              <CastList characters={cast} />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default CastCharacterForm;
