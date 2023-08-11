import { createClient } from "@supabase/supabase-js";
import { getActor } from "./tmdb-api";

const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_CLIENT_API_KEY;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const signup = async (signupDetails) => {
  const response = await supabase.auth.signUp({
    email: signupDetails.email,
    password: signupDetails.password,
    options: {
      data: {
        firstName: signupDetails.firstName,
        lastName: signupDetails.lastName,
      },
    },
  });
  return response;
};

export const login = async (userDetails) => {
  const response = await supabase.auth.signInWithPassword({
    email: userDetails.email,
    password: userDetails.password,
  });
  return response;
};

export const logout = async () => {
  await supabase.auth.signOut();
};

export const getSession = async () => {
  return await supabase.auth.getSession();
};

export const saveActorfavourite = async (userId, actorId) => {
  let favourites = await getActorFavourites(userId);

  favourites.push(actorId);

  const { data, error } = await supabase.from("profiles").update({ favouriteactors: favourites }).eq("id", userId).select();

  return favourites;
};

export const getActorFavourites = async (userId) => {
  const { data: profile, error } = await supabase.from("profiles").select("favouriteactors").eq("id", userId).single();

  if (profile) {
    return profile.favouriteactors;
  } else {
    return [];
  }
};

export const deleteActorFavourites = async (userId, actorId) => {
  let favourites = await getActorFavourites(userId);
  favourites.splice(favourites.indexOf(actorId), 1);

  const { data, error } = await supabase.from("profiles").update({ favouriteactors: favourites }).eq("id", userId).select();

  return favourites;
};

export const saveMoviefavourite = async (userId, movieId) => {
  let favourites = await getMovieFavourites(userId);

  favourites.push(movieId);

  const { data, error } = await supabase.from("profiles").update({ favouritemovies: favourites }).eq("id", userId).select();

  return favourites;
};

export const getMovieFavourites = async (userId) => {
  const { data: profile, error } = await supabase.from("profiles").select("favouritemovies").eq("id", userId).single();

  if (profile) {
    return profile.favouritemovies;
  } else {
    return [];
  }
};

export const deleteMovieFavourite = async (userId, movieId) => {
  let favourites = await getMovieFavourites(userId);
  favourites.splice(favourites.indexOf(movieId), 1);

  const { data, error } = await supabase.from("profiles").update({ favouritemovies: favourites }).eq("id", userId).select();

  return favourites;
};

export const getTvFavourites = async (userId) => {
  const { data: profile, error } = await supabase.from("profiles").select("favouritetv").eq("id", userId).single();

  if (profile) {
    return profile.favouritetv;
  } else {
    return [];
  }
};

export const saveTvfavourite = async (userId, tvId) => {
  let favourites = await getTvFavourites(userId);

  favourites.push(tvId);

  const { data, error } = await supabase.from("profiles").update({ favouritetv: favourites }).eq("id", userId).select();

  return favourites;
};

export const deleteTvFavourite = async (userId, tvId) => {
  let favourites = await getTvFavourites(userId);
  favourites.splice(favourites.indexOf(tvId), 1);

  const { data, error } = await supabase.from("profiles").update({ favouritetv: favourites }).eq("id", userId).select();

  return favourites;
};

export const saveMustWatchMovies = async (userId, movieId) => {
  let mustWatch = await getMustWatchMovies(userId);
  mustWatch.push(movieId);

  const { data, error } = await supabase.from("profiles").update({ mustwatchmovies: mustWatch }).eq("id", userId).select();

  return mustWatch;
};

export const getMustWatchMovies = async (userId) => {
  const { data: profile, error } = await supabase.from("profiles").select("mustwatchmovies").eq("id", userId).single();

  if (profile) {
    return profile.mustwatchmovies;
  } else {
    return [];
  }
};

export const deleteMustWatchMovies = async (userId, movieId) => {
  let mustWatch = await getMustWatchMovies(userId);
  mustWatch.splice(mustWatch.indexOf(movieId), 1);

  const { data, error } = await supabase.from("profiles").update({ mustwatchmovies: mustWatch }).eq("id", userId).select();
  return mustWatch;
};

export const saveMustWatchTelevision = async (userId, tvId) => {
  let mustWatch = await getMustWatchTelevision(userId);
  mustWatch.push(tvId);

  const { data, error } = await supabase.from("profiles").update({ mustwatchtv: mustWatch }).eq("id", userId).select();

  return mustWatch;
};

export const getMustWatchTelevision = async (userId) => {
  const { data: profile, error } = await supabase.from("profiles").select("mustwatchtv").eq("id", userId).single();

  if (profile) {
    return profile.mustwatchtv;
  } else {
    return [];
  }
};

export const deleteMustWatchTelevision = async (userId, tvId) => {
  let mustWatch = await getMustWatchMovies(userId);
  mustWatch.splice(mustWatch.indexOf(tvId), 1);

  const { data, error } = await supabase.from("profiles").update({ mustwatchtv: mustWatch }).eq("id", userId).select();
  return mustWatch;
};

export const createUserMovie = async (userId, movieDetails) => {
  const { data, error } = await supabase
    .from("movies")
    .insert([{ created: new Date(), userid: userId, id: movieDetails.id, overview: movieDetails.movieOverview, genre_ids: [movieDetails.genre], title: movieDetails.movieTitle }])
    .select()
    .single();

    console.log(error)
  if (data) {
    return data;
  }
  return {};
};

export const getUserMovies = async (userId) => {
  const { data, error } = await supabase.from("movies").select().eq("userid", userId);

  //console.log(data, error)

  if (data) {
    return data;
  } else {
    return [];
  }
};

export const getUserMovie = async (movieId) => {
  const { data, error } = await supabase.from("movies").select().eq("id", movieId).single();

  if (data) {
    return data;
  } else {
    return [];
  }
};

export const uploadMoviePoster = async (movieId, file) => {
  const { data, error } = await supabase.storage.from("movieImages").upload(`${movieId}/${file.name}`, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (data) {
    return data;
  } else {
    return [];
  }
};

export const setMoviePoster = async (movieId, urltoposter) => {
  const { data, error } = await supabase.from("movies").update({ movie_poster: urltoposter }).eq("id", movieId);

  console.log(error);

  if (data) {
    return data;
  }
};

export const getMoviePosters = async (movieId) => {
  const files = await supabase.storage.from("movieImages").list(movieId, {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });

  if (files.data) {
    let urls = [];

    files.data.map(async (file) => {
      const url = supabase.storage.from("movieImages").getPublicUrl(`${movieId}/${file.name}`);
      urls.push(url.data.publicUrl);
    });
    return urls;
  } else {
    return [];
  }
};

export const createCharacter = async (userId, movieId, charcterDetails) => {
  const id = crypto.randomUUID();
  const { data, error } = await supabase
    .from("characters")
    .insert([{ id: id, userid: userId, movieid: movieId, actor: charcterDetails.actor.id, name: charcterDetails.name }])
    .select()
    .single();

  console.log(error);

  if (data) {
    return data;
  }
  return {};
};

export const getCharacters = async (movieId) => {
  const { data, error } = await supabase.from("characters").select().eq("movieid", movieId);

  if (data) {
    return data;
  } else {
    return [];
  }
};

export const getUserCredits = async (movieId) => {
  const { data, error } = await supabase.from("characters").select().eq("movieid", movieId);

  if(data) {
    return data
  }
};

export const deleteCharacter = async (character) => {
  const { data, error } = await supabase.from("characters").delete().eq("id", character.id);

  console.log(character.id)



  if (data) {
    return data;
  } else {
    return [];
  }
};
