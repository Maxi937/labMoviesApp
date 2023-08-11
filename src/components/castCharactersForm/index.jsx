import React, { useContext, useState, useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";
import Select from "@mui/material/Select";
import Fab from "@mui/material/Fab";
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
import { createCharacter, getCharacters } from "../../api/supabase-api.js";
import { getActorsCharacterQuery, getActorsQuery } from "../../hooks/useMovieQueries.js";
import { deleteCharacter } from "../../api/supabase-api.js";
import { getActor } from "../../api/tmdb-api.js";
import { useQueries, useQuery } from "react-query";
import { getUserCredits } from "../../api/supabase-api.js";
import Spinner from "../spinner";

const CastCharacterForm = ({ userId, movieId, favouriteActors }) => {
  const [actor, setActor] = useState({});
  const castQuery = useQuery(["credits", movieId], async () => getUserCredits(movieId), {});
  const cast = castQuery.data ? castQuery.data : [];

  const actorQuery = useQueries(
    cast.map((actor) => {
      return {
        queryKey: ["actors", actor.actor],
        queryFn: async () => getActor(actor.actor),
        enabled: !!cast,
        onSuccess: (data) => {
          data.character = actor.name;
          data.characterId = actor.id
          return data;
        },
      };
    })
  );

  const actors = () => {
    if (actorQuery) {
      const isLoading = actorQuery.find((m) => m.isLoading === true);

      if (isLoading) {
        return <Spinner />;
      }
      const actors = actorQuery.map((q) => q.data);
      return <CastList actors={actors} state={castQuery}/>;
    }
  };

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

  function handleActorChange(actor) {
    setActor(actor);
  }

  async function onSubmit(character) {
    if (!actor) {
      return;
    }
    character.actor = actor;

    cast.map(async (castedActor) => {
      if(castedActor.actor === actor.id) {
        await deleteCharacter(castedActor.id)
        navigate(0)
      }
    })
    await createCharacter(userId, movieId, character)
    castQuery.refetch()
  }

  async function handleDone() {
    navigate("/profile");
  }

  return (
    <>
      <Paper sx={styles.header}>
        <Typography component="h2" variant="h3" sx={styles.formHeaders}>
          Cast a Character
        </Typography>
        <Fab sx={styles.done} color="primary" onClick={handleDone}>
          Done
        </Fab>
      </Paper>

      <Paper component="div" sx={styles.root}>
        <Box sx={styles.left}>
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

            <Box sx={styles.actorPicker}>
              <ActorPicker selected={actor} actors={favouriteActors} overrideClick={handleActorChange} />
            </Box>

            <Box sx={styles.buttons}>
              <Button type="submit" color="primary" sx={styles.submit}>
                Cast
              </Button>
            </Box>
          </form>
        </Box>

        <Box sx={styles.castListContainer}>
          <Typography component="h2" variant="h3" sx={styles.formHeaders}>
            Cast
          </Typography>
          <Box sx={styles.castList}>{actors()}</Box>
        </Box>
      </Paper>
    </>
  );
};

export default CastCharacterForm;
