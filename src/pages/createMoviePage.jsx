import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import CreateMovieForm from "../components/createMovieForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const CreateMoviePage = (props) => {
  return (
      <CreateMovieForm/>
  );
};

export default CreateMoviePage;