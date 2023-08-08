import { createClient } from "@supabase/supabase-js";

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

  console.log(error)
  return favourites;
};

export const getActorFavourites = async (userId) => {
  const { data: profile, error } = await supabase.from("profiles").select("favouriteactors").eq("id", userId).single();
  console.log("userid" , userId)
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
