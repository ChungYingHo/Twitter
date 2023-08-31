import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext();
export const useUserContext = ()=> useContext(UserContext)

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [followState, setFollowState] = useState([]);
  const handleFollowState = (id)=>{
    if(followState.find((user) => parseInt(user.id) === parseInt(id))){
      setFollowState((prevUsersData) =>
        prevUsersData.map((user) =>
          parseInt(user.id) === parseInt(id)? { ...user, isFollowed: !user.isFollowed } : user
        )
      )
    }
  }

  return (
    <UserContext.Provider value={{ userData, setUserData, followState, setFollowState, handleFollowState }}>
      {children}
    </UserContext.Provider>
  );
};
