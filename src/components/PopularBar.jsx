import styled from "styled-components";
import { useEffect } from "react";
import PopularCard from "./PopularCard";
// api
import { getPopUsers, followUser, disFollowUser } from "../api/popular";
import { useUserContext } from "../context/UserContext";
import { getUserFollowings, getUser } from "../api/user";

const Container = styled.div`
  background-color: #fafafb;
  border-radius: 16px;

  right: 0;
  min-height: 731px;
  width: 100%;
  padding: 0;
  position: sticky;
  top: 16px;
`;

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

// component
export default function PopularBar() {
  const {
    followState,
    setFollowState,
    userFollowers,
    handleFollowers,
    userFollowings,
    setUserFollowings,
    handleFollowings,
    handleUpdatedUserData,
    handleUpdatedOtherUserData
  } = useUserContext();
  // 獲取推薦使用者
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getPopUsers();
        setFollowState(usersData);
      } catch (error) {
        console.error("Get Users Failed:", error);
      }
    };
    fetchUsers();
  }, [setFollowState]);

  // 點擊切換 isFollowed 狀態
  const handleFollow = async (id) => {
    try {
      if (followState.find((user) => user.id === id).isFollowed) {
        await disFollowUser({ followingId: id });

        userFollowers.find((user) => user.followerId === id) &&
          handleFollowers(id);
        userFollowings.find((user) => user.followingId === id) &&
          handleFollowings(id);
        handleUpdatedUserData()
        handleUpdatedOtherUserData(id)
      } else {
        await followUser({ id });
        userFollowers.find((user) => user.followerId === id) &&
          handleFollowers(id);
        if (userFollowings.find((user) => user.followingId === id)) {
          handleFollowings(id);
        } else {
          const updatedFollowings = await getUserFollowings();
          setUserFollowings(updatedFollowings);
        }
        handleUpdatedUserData()
        handleUpdatedOtherUserData(id)
      }

      setFollowState((prevUsersData) =>
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
        {followState.map((user) => {
          return (
            <PopularCard
              key={user.id}
              id={user.id}
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
