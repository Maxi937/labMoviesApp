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

export const savefavourite = async (movieId) => {
  console.log("saving favourite");
  const response = await supabase
    .from("userMovies")
    .insert([{ favouriteMovies: movieId }])
    .select();
};
