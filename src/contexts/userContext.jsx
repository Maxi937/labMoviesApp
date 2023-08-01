import React, { useState, useEffect } from "react";
import { supabase, getSession } from "../api/supabase-api";

export const UserContext = React.createContext(null);

const UserContextProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    getSession().then(({ data: { session } }) => {
      setUser(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session)
    })
  }, [])

  const authenticate = (session) => {
    console.log("setting user: ", session)
    setUser(session);
  };

  const logout = () => {
    console.log("logout")
    setUser("");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        authenticate,
        logout
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
