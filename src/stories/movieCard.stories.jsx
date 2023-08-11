import React from "react";
import MovieCard from "../components/contentCard";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import UserContextProvider from "../contexts/userContext";
import { action } from "@storybook/addon-actions";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

export default {
  title: "Home Page/MovieCard",
  component: MovieCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <UserContextProvider>{Story()}</UserContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <MovieCard
      content={SampleMovie}
      action={(movie) => <AddToFavouritesIcon content={movie} />}
      taging={(movie) => null}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const sampleNoPoster = { ...SampleMovie, poster_path: undefined };
  return (
    <MovieCard
      content={sampleNoPoster}
      action={(movie) => <AddToFavouritesIcon content={movie} />}
      taging={(movie) => null}
    />
  );
};
Exceptional.storyName = "exception";
