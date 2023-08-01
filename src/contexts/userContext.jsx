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
      console.log("auth state change")
      setUser(session)
    })
  }, [])


  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
