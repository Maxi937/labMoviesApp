import React from "react";
import ContentPanel from "../components/contentPanel";
import MovieList from "../components/contentList";
import ContentListPageTemplate from "../components/templateContentListPage";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Grid from "@mui/material/Grid";
import UserContextProvider from "../contexts/userContext";

export default {
  title: "content/ContentPanel",
  component: MovieList,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <UserContextProvider>{Story()}</UserContextProvider>,
  ],
};

export const Basic = () => {
  const moviesA = [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
  ];

  const moviesB = [
    { ...SampleMovie, id: 6 },
    { ...SampleMovie, id: 7 },
    { ...SampleMovie, id: 8 },
  ];

  return (
    <ContentPanel >
      <ContentListPageTemplate title="Suggested" content={moviesB} action={(movie) => <AddToFavouritesIcon content={movie} />}/>
      <ContentListPageTemplate title="Upcoming" content={moviesA} action={(movie) => <AddToFavouritesIcon content={movie} />}/>
    </ContentPanel>
  );
};
Basic.storyName = "Default";
