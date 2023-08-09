import React, { useContext, useState } from "react";
import { tmdbMovieGenres } from "./genres.js";
import { createUserMovie } from "../../api/supabase-api.js";
import { Alert, AlertTitle } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles.js";
import { UserContext } from "../../contexts/userContext.jsx";
import CastCharacterForm from "../castCharactersForm/index.jsx";
import PlaceHolder from "../../images/film-poster-placeholder.png"
import { uploadMoviePoster } from "../../api/supabase-api.js";

const CreateMovieForm = () => {
  const defaultValues = {
    movieTitle: "",
    movieOverview: "",
    movieStars: "",
    genre: 28,
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
  const [genre, setGenre] = useState(28);
  const [file, setSelectedFile] = useState("")

  const handleRatingChange = (event) => {
    setGenre(event.target.value);
  };

  const handleImageChange = (event) => {
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0])
  }
  

  async function onSubmit(movieDetails) {
    movieDetails.id = crypto.randomUUID();
    movieDetails.genre = genre;
    movieDetails.moviePoster = file
    const movie = await context.createAMovie(movieDetails);

    if(movieDetails.moviePoster) {
      await uploadMoviePoster(movie.id , movieDetails.moviePoster)
    }

    //navigate("/profile");
  }

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3" sx={styles.formHeaders}>
        Create Your Movie
      </Typography>

      {errors.login && (
        <Alert severity="error">
          <AlertTitle>I'm Sorry</AlertTitle>
          <strong>{errors.login.message}</strong>
        </Alert>
      )}

      <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="movieTitle"
          control={control}
          rules={{ required: "Title is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField variant="outlined" margin="normal" required onChange={onChange} value={value} id="movieTitle" label="Movie Title" autoFocus />
          )}
        />
        {errors.movieTitle && (
          <Typography variant="h6" component="p">
            {errors.movieTitle.message}
          </Typography>
        )}

        <br></br>

        <Controller
          name="movieOverview"
          control={control}
          rules={{ required: "Overview is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={styles.textField}
              multiline={true}
              minRows={5}
              variant="outlined"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="movieOverview"
              label="Overview"
            />
          )}
        />
        {errors.movieOverview && (
          <Typography variant="h6" component="p">
            {errors.movieOverview.message}
          </Typography>
        )}

        <br></br>

        <Controller
          control={control}
          name="movieGenres"
          render={({ field: { onChange, value } }) => (
            <TextField id="movieGenre" select variant="outlined" label="Genre Select" value={genre} onChange={handleRatingChange}>
              {tmdbMovieGenres.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <br></br>
        <br></br>

        <Controller
          control={control}
          name="moviePoster"
          render={({ field: { onChange, defaultValue  } }) => <input id="moviePoster" type="file" value={file.image} onChange={(e) => handleImageChange(e)} />}
        />

        <Box sx={styles.buttons}>
          <Button type="submit" color="primary" sx={styles.submit}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateMovieForm;
