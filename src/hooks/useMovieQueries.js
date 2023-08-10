import { useQuery, useQueries } from "react-query";
import {
  getMovies,
  getMovie,
  getUpcomingMovies,
  getSuggestedMoviesTV,
  getNowPlayingMovies,
  getMovieImages,
  getTv,
  getTvImages,
  getMoviesByGenre,
  getTelevisionByGenre,
  getTvShow,
  getActor,
} from "../api/tmdb-api";
import { getMoviePosters } from "../api/supabase-api";

export const discoverMoviesQuery = (pageNumber) => {
  return useQuery(["discoverMovies", pageNumber], async () => getMovies(pageNumber), { keepPreviousData: true });
};

export const getMoviesQuery = (movies) => {
  return useQueries(
    movies.map((movieId) => {
      return { queryKey: ["movieFavourite", movieId], queryFn: async () => getMovie(movieId) };
    })
  );
};

export const getTvQuery = (tvshows) => {
  return useQueries(
    tvshows.map((tvId) => {
      return { queryKey: ["movieFavourite", tvId], queryFn: async () => getTv(tvId) };
    })
  );
};

export const getProfileContentQueryTest = (context) => {
  return {
    movieFavourites: useQueries(
      context.movieFavourites.map((movieId) => {
        return { queryKey: ["movieFavourite", movieId], queryFn: async () => getMovie(movieId) };
      })
    ),
    tvFavourites: useQueries(
      context.tvFavourites.map((tvId) => {
        return { queryKey: ["tvFavourite", tvId], queryFn: async () => getTvShow(tvId) };
      })
    ),
    mustWatchTv: useQueries(
      context.mustWatchTelevision.map((tvId) => {
        return { queryKey: ["mustWatchTv", tvId], queryFn: async () => getTvShow(tvId) };
      })
    ),
    mustWatchMovies: useQueries(
      context.mustWatchMovies.map((movieId) => {
        return { queryKey: ["mustWatchMovies", movieId], queryFn: async () => getMovie(movieId) };
      })
    ),
    actorFavourites: useQueries(
      context.actorFavourites.map((actorId) => {
        return { queryKey: ["actorFavourites", actorId], queryFn: async () => getActor(actorId) };
      })
    ),
  };
};

export const getMovieQuery = (movieId) => {
  return useQuery(["movie", movieId], async () => getMovie(movieId));
};

export const discoverTelevisionQuery = (pageNumber) => {
  return useQuery(["discoverTv", pageNumber], async () => getTv(pageNumber), { keepPreviousData: true });
};

export const upcomingMoviesQuery = (pageNumber) => {
  return useQuery(["discoverUpcomingMovies", pageNumber], async () => getUpcomingMovies(pageNumber), { keepPreviousData: true });
};

export const discoverGenreMoviesQuery = (pageNumber, genre) => {
  return useQuery(["discoverUpcomingMovies", genre, pageNumber], async () => getMoviesByGenre(pageNumber, genre), { keepPreviousData: true });
};

export const discoverGenreTelevisionQuery = (pageNumber, genre) => {
  return useQuery(["discoverUpcomingMovies", genre, pageNumber], async () => getTelevisionByGenre(pageNumber, genre), { keepPreviousData: true });
};

export const suggestedMoviesQuery = () => {
  const query = useQuery("discoverSuggestedMovies", getSuggestedMoviesTV);

  if (query.status === "success") {
    const movies = query.data.movies.results;
    const tvShows = query.data.tv.results;
    const suggested = movies.concat(tvShows);
    suggested.sort((a, b) => b.popularity - a.popularity);
    query.data = { results: suggested.slice(0, 13) };
    return query;
  } else {
    return query;
  }
};

export const getMoviePostersQuery = (movieId) => {
  return useQuery(["images", movieId], async () => await getMoviePosters(movieId));
};

export const heroMovieQuery = () => {
  const query = useQuery("discoverHeroMovie", getNowPlayingMovies);
  if (query.status === "success") {
    const movies = query.data.results;
    const movie = movies[0];
    query.data.results = movies.slice(0, 1);
    return query;
  } else {
    return query;
  }
};

export const heroImageQuery = (content) => {
  if (content.first_air_date) {
    return useQuery(["getHeroImage", content.id], async () => await getTvImages(content.id));
  } else {
    return useQuery(["getHeroImage", content.id], async () => await getMovieImages(content.id));
  }
};

// const favouriteMovieQueries = useQueries(
//     favourites.map((movieId) => {
//       return {
//         queryKey: ["movie", movieId ],
//         queryFn: async () => getMovie(movieId),
//       };
//     })
//   );
