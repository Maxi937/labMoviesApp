import { useQuery } from "react-query";
import { getMovies, getUpcomingMovies } from "../api/tmdb-api";

export const discoverMoviesQuery = () => {
    return useQuery("discover", getMovies);
}

export const upcomingMoviesQuery = () => {
    return useQuery("discoverUpcoming", getUpcomingMovies);;
}