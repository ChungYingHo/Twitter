import React, { createContext, useState, useContext } from "react";
import { getUser } from "../api/user"

export const UserContext = createContext();
export const useUserContext = ()=> useContext(UserContext)

export const UserContextProvider = ({ children }) => {
  // 現正登入使用者資料
  const [userData, setUserData] = useState({});
  const [otherUserData, setOtherUserData] = useState({})
  // 確保資料存在
  const handleUserData = async(id)=>{
    if(Object.keys(userData).length === 0){
      try{
        const user = await getUser(parseInt(id))
        console.log("Fetched user data");
        setUserData(user)
        console.log('[ReFetching UserData]')
      } catch (error){
        console.log('[No user data:]', error)
      }
    }
  }
  // 辨別是現正登入用戶還是他人資料
  const handleStorage = async(id)=>{
    const userId = localStorage.getItem('userID')
    if(parseInt(id) !== parseInt(userId)){
      const otherData = await getUser(id)
      setOtherUserData(otherData)
      console.log('Storage in Other')
    } else {
      handleUserData(id)
      console.log('Storage in User')
    }
  }
  // 更新使用者資料
  const handleUpdatedUserData = async(id)=>{
    const updatedData = await getUser(id)
    setUserData(updatedData)
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
    <UserContext.Provider value={{ userData, setUserData, otherUserData, setOtherUserData,handleUserData, handleStorage, handleUpdatedUserData, followState, setFollowState, handleFollowState, userFollowers, setUserFollowers, userFollowings, setUserFollowings, handleFollowers, handleFollowings }}>
      {children}
    </UserContext.Provider>
  );
};
