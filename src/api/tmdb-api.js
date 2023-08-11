export const getMovies = async (pageNumber = 1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageNumber}`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getMoviesByGenre = async (pageNumber = 1, genre) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&with_genres=${genre}&page=${pageNumber}`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getTelevisionByGenre = async (pageNumber = 1, genre) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&with_genres=${genre}&page=${pageNumber}`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getTv = async (pageNumber = 1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageNumber}`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getSuggestedMoviesTV = async () => {
  try {
    const movies = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    );
    const tv = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`);

    if (!movies.ok || !tv.ok) {
      throw new Error(response.json().message);
    }

    return {
      movies: await movies.json(),
      tv: await tv.json(),
    };

  } catch (error) {
    throw error;
  }
};

export const getNowPlayingMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getMovie = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_KEY}`);
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getActor = async (actorId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${import.meta.env.VITE_TMDB_KEY}`);
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getTvShow = async (tvId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}?api_key=${import.meta.env.VITE_TMDB_KEY}`);
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`);
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getUpcomingMovies = async (pageNumber = 1) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${pageNumber}`);
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getGenres = async () => {
  return fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US")
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`);
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getTvImages = async (tvId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`);
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getMovieReviews = async (id) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`);
  const json = await res.json();
  return json.results;
};
