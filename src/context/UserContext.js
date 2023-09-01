import React, { createContext, useState, useContext } from "react";
import { getUser } from "../api/user";

export const UserContext = createContext();
export const useUserContext = ()=> useContext(UserContext)

export const UserContextProvider = ({ children }) => {
  // 現正登入使用者資料
  const [userData, setUserData] = useState({});
  const handleUserData = async(id)=>{
    if(!userData){
      try{
        const user = await getUser(id)
        setUserData(user)
      } catch (error){
        console.log('[No user data:]', error)
      }
    }
  }

  // 推薦跟隨
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
  const handleFollowings = (id)=>{
    setUserFollowings((prevUsersData) =>
      prevUsersData.map((user) =>
        user.Following.id === id
          ? {
              ...user,
              Following: {
                ...user.Following,
                isFollowed: !user.Following.isFollowed,
              },
            }
          : user
      )
    )
  }
  // userinfo
  

  return (
    <UserContext.Provider value={{ userData, setUserData, handleUserData,followState, setFollowState, handleFollowState, userFollowers, setUserFollowers, userFollowings, setUserFollowings, handleFollowers, handleFollowings }}>
      {children}
    </UserContext.Provider>
  );
};
