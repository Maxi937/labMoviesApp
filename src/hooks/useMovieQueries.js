import { useQuery, useQueries } from "react-query";
import { getMovies, getUpcomingMovies, getSuggestedMoviesTV, getNowPlayingMovies, getMovieImages } from "../api/tmdb-api";

export const discoverMoviesQuery = () => {
  return useQuery("discover", getMovies);
};

export const upcomingMoviesQuery = () => {
  return useQuery("discoverUpcoming", getUpcomingMovies);
};

export const suggestedMoviesQuery = () => {
  const query = useQuery("discoverSuggested", getSuggestedMoviesTV);

  if (query.status === "success") {
    const movies = query.data.movies.results
    const tvShows = query.data.tv.results
    const suggested = movies.concat(tvShows)
    suggested.sort((a, b) => b.popularity - a.popularity);
    query.data = { results: suggested.slice(0, 13) }
    return query
  } else {
    return query;
  }
};

export const heroMovieQuery = () => {
    const query = useQuery("discoverHeroMovie", getNowPlayingMovies);
    if (query.status === "success") {
      const movies = query.data.results
      const movie = movies[0]
      query.data.results = movies.slice(0,1)
      return query
    } else {
      return query;
    }
  };

  export const heroMovieImageQuery = (movie) => {
    return useQuery(["getHeroMovieImage", movie.id], async () => await getMovieImages(movie.id))
  }

// const favouriteMovieQueries = useQueries(
//     favourites.map((movieId) => {
//       return {
//         queryKey: ["movie", movieId ],
//         queryFn: async () => getMovie(movieId),
//       };
//     })
//   );
