import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext();
export const useUserContext = ()=> useContext(UserContext)

export const UserContextProvider = ({ children }) => {
  // 推薦跟隨
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
  // 跟隨者
  const [userFollowers, setUserFollowers] = useState([])
  const handleFollowers = (id)=>{
    setUserFollowers((prevUsersData) =>
      prevUsersData.map((user) =>
        user.Follower.id === id
          ? {
              ...user,
              Follower: {
                ...user.Follower,
                isFollowed: !user.Follower.isFollowed,
              },
            }
          : user
      )
    )
  }
  // 跟隨中
  const [userFollowings, setUserFollowings] = useState([])

  return (
    <UserContext.Provider value={{ userData, setUserData, followState, setFollowState, handleFollowState, userFollowers, setUserFollowers, userFollowings, setUserFollowings, handleFollowers }}>
      {children}
    </UserContext.Provider>
  );
};
