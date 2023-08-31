import styled from "styled-components";
import { useState, useEffect } from "react";
import PopularCard from "./PopularCard";
// api
import { getPopUsers, followUser, disFollowUser } from "../api/popular";

const Container = styled.div`
    margin-top: 16px;
    padding: 0;
    height: fit-content;
    width: 100%;
    background-color: #fafafb;
    border-radius: 16px;
    position: absolute;
    right: 0;
`

const Title = styled.div`
  height: 74px;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: #e6ecf0 solid 1px;
  div {
    padding-left: 24px;
    font-weight: 700;
    font-size: 24px;
  }
`;
const CardContainer = styled.div`
  height: fit-content;
  width: 100%;
`;


export default function PopularBar(){
    const [usersData, setUsersData] = useState([])
    // 獲取推薦使用者
    useEffect(()=>{
        const fetchUsers = async()=>{
            try{
                const usersData = await getPopUsers()
                setUsersData(usersData)
            } catch(error){
                console.error('Get Users Failed:', error)
            }
        }
        fetchUsers()
    }, [usersData])


  // 點擊切換 isFollowed 狀態
  const handleFollow = async (id) => {
    try {
      if (usersData.find((user) => user.id === id).isFollowed) {
        await disFollowUser({ followingId: id });
      } else {
        await followUser({ id });
      }
      setUsersData((prevUsersData) =>
        prevUsersData.map((user) =>
          user.id === id ? { ...user, isFollowed: !user.isFollowed } : user
        )
      );
    } catch (error) {
      console.error("Error occur:", error);
    }
  };

  return (
    <Container>
      <Title>
        <div>推薦跟隨</div>
      </Title>
      <CardContainer>
        {usersData.map((user) => {
          return (
            <PopularCard
              key={user.id}
              avatar={user.avatar}
              name={user.name}
              account={user.name}
              isFollowed={user.isFollowed}
              onClick={() => handleFollow(user.id)}
            />
          );
        })}
      </CardContainer>
    </Container>
  );
}
