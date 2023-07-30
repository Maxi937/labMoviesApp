import React, { useState } from "react";

export const SessionContext = React.createContext(null);

const SessionContextProvider = (props) => {
  const [mySession, setMySession] = useState(null);

  const setSession = (session) => {
    console.log("setting session")
    setMySession(session);
  };

  const getSession = () => {
    return mySession;
  };

  return (
    <SessionContext.Provider
      value={{
        setSession,
        getSession
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
