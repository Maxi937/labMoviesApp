import React from "react";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import UserContextProvider from "../contexts/userContext";
import ContentHero from "../components/contentHero";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

export default {
  title: "content/ContentHero",
  component: ContentHero,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>,
    (Story) => <UserContextProvider>{Story()}</UserContextProvider>,
  ],
};

export const Basic = () => {
  const movie = SampleMovie;

  return <ContentHero movie={movie} />;
};
Basic.storyName = "Default";
