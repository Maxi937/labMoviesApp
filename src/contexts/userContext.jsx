import React, { useState, useEffect } from "react";
import { supabase, getSession, getTvFavourites, saveActorfavourite, deleteActorFavourites, getUserMovies } from "../api/supabase-api";
import {
  createUserMovie,
  getActorFavourites,
  getMovieFavourites,
  saveTvfavourite,
  deleteTvFavourite,
  getMustWatchTelevision,
  saveMustWatchTelevision,
  deleteMustWatchTelevision,
  saveMoviefavourite,
  deleteMovieFavourite,
  saveMustWatchMovies,
  deleteMustWatchMovies,
  getMustWatchMovies,
} from "../api/supabase-api";

export const UserContext = React.createContext(null);

const UserContextProvider = (props) => {
  const [user, setUser] = useState();
  const [session, setSession] = useState();
  const [movieFavourites, setMovieFavourites] = useState([]);
  const [mustWatchMovies, setMustWatchMovies] = useState([]);
  const [tvFavourites, setTvFavourites] = useState([]);
  const [mustWatchTelevision, setMustWatchTelevision] = useState([]);
  const [actorFavourites, setActorFavourites] = useState([]);
  const [userMovies, setUserMovies] = useState([]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "SIGNED_OUT") {
        setUser("");
        setSession("");
        setMovieFavourites([]);
        setMustWatchMovies([]);
        setTvFavourites([]);
        setMustWatchTelevision([]);
        setActorFavourites([]);
      } else if (session) {
        setUser(session.user);
        setSession(session);
        if (session.user) {
          getMovieFavourites(session.user.id).then((data) => {
            setMovieFavourites(data);
          });
          getMustWatchMovies(session.user.id).then((data) => {
            setMustWatchMovies(data);
          });
          getMustWatchTelevision(session.user.id).then((data) => {
            setMustWatchTelevision(data);
          });
          getTvFavourites(session.user.id).then((data) => {
            setTvFavourites(data);
          });
          getActorFavourites(session.user.id).then((data) => {
            setActorFavourites(data);
          });
          getUserMovies(session.user.id).then((data) => {
            setUserMovies(data);
          });
        }
      }
    });
  }, []);

  const addToMovieFavourites = async (content) => {
    let updatedFavourites = movieFavourites;

    if (!updatedFavourites.includes(content.id)) {
      updatedFavourites = await saveMoviefavourite(user.id, content.id);
    } else {
      updatedFavourites = await deleteMovieFavourite(user.id, content.id);
    }
    setMovieFavourites(updatedFavourites);
  };

  const addToActorFavourites = async (actor) => {
    let updatedFavourites = actorFavourites;

    if (!updatedFavourites.includes(actor.id)) {
      updatedFavourites = await saveActorfavourite(user.id, actor.id);
    } else {
      updatedFavourites = await deleteActorFavourites(user.id, actor.id);
    }
    setActorFavourites(updatedFavourites);
  };

  const addToMustWatchMovies = async (content) => {
    let updatedMustWatch = mustWatchMovies;

    if (!updatedMustWatch.includes(content.id)) {
      updatedMustWatch = await saveMustWatchMovies(user.id, content.id);
    } else {
      updatedMustWatch = await deleteMustWatchMovies(user.id, content.id);
    }
    setMustWatchMovies(updatedMustWatch);
  };

  const addToTvFavourites = async (content) => {
    let updatedFavourites = tvFavourites;

    if (!updatedFavourites.includes(content.id)) {
      updatedFavourites = await saveTvfavourite(user.id, content.id);
    } else {
      updatedFavourites = await deleteTvFavourite(user.id, content.id);
    }
    setTvFavourites(updatedFavourites);
  };

  const addToMustWatchTelevision = async (content) => {
    let updatedMustWatch = mustWatchTelevision;

    if (!updatedMustWatch.includes(content.id)) {
      updatedMustWatch = await saveMustWatchTelevision(user.id, content.id);
    } else {
      updatedMustWatch = await deleteMustWatchTelevision(user.id, content.id);
    }
    setMustWatchTelevision(updatedMustWatch);
  };

  const createAMovie = async (movieDetails) => {
    const movie = await createUserMovie(user.id, movieDetails);
    const currentMovies = [...userMovies]
    currentMovies.push(movie)
    setUserMovies(currentMovies)
    console.log(userMovies)
    return movie
  };

  return (
    <UserContext.Provider
      value={{
        user,
        session,
        movieFavourites,
        mustWatchMovies,
        tvFavourites,
        mustWatchTelevision,
        actorFavourites,
        userMovies,
        addToActorFavourites,
        addToMovieFavourites,
        addToMustWatchMovies,
        addToTvFavourites,
        addToMustWatchTelevision,
        createAMovie,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
