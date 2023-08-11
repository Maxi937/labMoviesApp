import React from "react";
import MovieDetails from "../components/movieDetails";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import UserContextProvider from "../contexts/userContext";

export default {
  title: "Movie Details Page/MovieDetails",
  component: MovieDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <UserContextProvider>{Story()}</UserContextProvider>,
  ],
};

export const Basic = () => <MovieDetails movie={SampleMovie} />;

Basic.storyName = "Default";
