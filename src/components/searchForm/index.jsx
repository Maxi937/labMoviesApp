import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles";

const SearchForm = ({ contentType, setDrawerOpen }) => {
  const defaultValues = {
    title: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(defaultValues);
  const navigate = useNavigate();

  const onSubmit = (searchCriteria) => {
    setDrawerOpen(false)
    if(contentType === "movie") {
      navigate(`/movies/search/${searchCriteria.title}`)
    } else {
      navigate(`/tv/search/${searchCriteria.title}`)
    }
    
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Search Movies
      </Typography>

      <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="title"
          control={control}
          rules={{ required: "title is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField sx={{ width: "40ch" }} variant="outlined" margin="normal" required onChange={onChange} value={value} id="title" label="Title" autoFocus />
          )}
        />
        {errors.title && (
          <Typography variant="h6" component="p">
            {errors.title.message}
          </Typography>
        )}
  
        <Box sx={styles.buttons}>
          <Button type="submit" variant="contained" color="primary" sx={styles.submit}>
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={styles.submit}
            onClick={() => {
              reset({
                title: "",
              });
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SearchForm;
