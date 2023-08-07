import React, { useContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import SiteHeader from "./components/siteHeader";
import HomePage from "./pages/homePage";
import MoviesPage from "./pages/moviePage";
import TelevisionPage from "./pages/televisionPage";
import TvDetailsPage from "./pages/tvDetailsPage";
import MovieReviewPage from "./pages/movieReviewPage";
import MoviePage from "./pages/movieDetailsPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import LoginPage from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import UserContextProvider from "./contexts/userContext";
import LogoutButtonDebug from "./components/userControlButtons/logoutButtonDebug";
import SessionDebug from "./components/userControlButtons/sessionDebug";
import ProfileDebug from "./components/userControlButtons/profileDebug";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <BrowserRouter>
          <SiteHeader />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/tv" element={<TelevisionPage />} />
            <Route path="/tv/:id" element={<TvDetailsPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <LogoutButtonDebug />
          <SessionDebug />
          <ProfileDebug />
        </BrowserRouter>
      </UserContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
