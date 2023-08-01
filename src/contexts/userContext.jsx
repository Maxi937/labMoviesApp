import React, { useState, useEffect } from "react";
import { supabase, getSession } from "../api/supabase-api";
import { getFavourites, savefavourite } from "../api/supabase-api"

export const UserContext = React.createContext(null);

const UserContextProvider = (props) => {
  const [user, setUser] = useState();
  const [session, setSession] = useState()
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    getSession().then(({ data: { session } }) => {
      if(session) {
        setUser(session.user)
        setSession(session)
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("auth state change")
      if(session) {
        setUser(session.user)
        setSession(session.session)
      } else {
        setUser(session)
      }
    })

    getFavourites().then((data) => {
      console.log("setting user favourites context", data)
      setFavourites(data)
    })
  }, [])

  const addToFavourites = async (movie) => {
    let updatedFavourites = favourites

    if (!favourites.includes(movie.id)) {
      updatedFavourites = await savefavourite(user.id, movie.id);
    }
    setFavourites(updatedFavourites)
  };

  return (
    <UserContext.Provider
      value={{
        user,
        session,
        favourites,
        addToFavourites
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
