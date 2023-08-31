import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext();
export const useUserContext = ()=> useContext(UserContext)

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [followState, setFollowState] = useState([]);

  return (
    <UserContext.Provider value={{ userData, setUserData, followState, setFollowState }}>
      {children}
    </UserContext.Provider>
  );
};
