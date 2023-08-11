import React from "react";
import ContentSlider from "../components/contentSlider";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import UserContextProvider from "../contexts/userContext";

export default {
  title: "content/ContentSlider",
  component: ContentSlider,
  decorators: [(Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>, (Story) => <UserContextProvider>{Story()}</UserContextProvider>],
};

export const Basic = () => {
  const moviesA = [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
    { ...SampleMovie, id: 6 },
    { ...SampleMovie, id: 7 },
    { ...SampleMovie, id: 8 },
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
    { ...SampleMovie, id: 6 },
    { ...SampleMovie, id: 7 },
    { ...SampleMovie, id: 8 },
  ];
  return <ContentSlider title="Favourite Movies" displayTitle={true} content={moviesA} action={(movie) => <AddToFavouritesIcon content={movie} />} />;
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const moviesB = [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
    { ...SampleMovie, id: 6 },
  ];

  return <ContentSlider title="Favourite Movies" displayTitle={true} content={moviesB} action={(movie) => <AddToFavouritesIcon content={movie} />} />;
};
Exceptional.storyName = "Exception";
