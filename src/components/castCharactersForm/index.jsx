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

const CastCharacterForm = () => {
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

  async function onSubmit(movieDetails) {
    console.log(movieDetails);

    if (response.error) {
      return setError("Movie", {
        type: "bad form",
        message: "Unable to process form",
      });
    }
  }

  return (
    <Box component="div" sx={styles.root}>
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
          name="characterName"
          control={control}
          rules={{ required: "Name is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField variant="outlined" margin="normal" required onChange={onChange} value={value} id="characterName" label="Character Name" autoFocus />
          )}
        />
        {errors.characterName && (
          <Typography variant="h6" component="p">
            {errors.characterName.message}
          </Typography>
        )}

        <br></br>
        <Box sx={styles.buttons}>
          <Button type="submit" color="primary" sx={styles.submit}>
            Cast
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CastCharacterForm;
