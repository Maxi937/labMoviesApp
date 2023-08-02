import React, { useState, useEffect } from "react";
import { supabase, getSession } from "../api/supabase-api";
import { getFavourites, savefavourite, deleteFavourite, saveMustWatch, deleteMustWatch, getMustWatch } from "../api/supabase-api";

export const UserContext = React.createContext(null);

const UserContextProvider = (props) => {
  const [user, setUser] = useState();
  const [session, setSession] = useState();
  const [favourites, setFavourites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(_event);
      if (_event === "SIGNED_OUT") {
        setUser("");
        setSession("");
        setFavourites([]);
      } else if (session) {
        setUser(session.user);
        setSession(session);
        getFavourites().then((data) => {
          console.log("setting user favourites context", data);
          setFavourites(data);
        });
        getMustWatch().then((data => {
          console.log("setting user Must Watch context", data);
          setMustWatch(data);
        }))
      }
    });
  }, []);

  const addToFavourites = async (movie) => {
    let updatedFavourites = favourites;

    if (!favourites.includes(movie.id)) {
      updatedFavourites = await savefavourite(user.id, movie.id);
    } else {
      updatedFavourites = await deleteFavourite(user.id, movie.id)
    }
    setFavourites(updatedFavourites);
  };

  const addToMustWatch = async (movie) => {
    let updatedMustWatch = mustWatch;

    if (!mustWatch.includes(movie.id)) {
      updatedMustWatch = await saveMustWatch(user.id, movie.id);
    } else {
      updatedMustWatch = await deleteMustWatch(user.id, movie.id)
    }
    setMustWatch(updatedMustWatch);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        session,
        favourites,
        mustWatch,
        addToFavourites,
        addToMustWatch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
