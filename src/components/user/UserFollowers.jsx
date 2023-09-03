// package
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
// component and style
import * as style from "../common/common.styled";
import { ReactComponent as LeftArrow } from "../../assets/left-arrow.svg";
import FollowrSubTool from "./FollowSubTool";
import FollowCard from "./FollowCard";
// api and function
import { UserContext } from "../../context/UserContext";
import { useAuthValitate } from "../../utils/authValidate";
import { getUserFollowers } from "../../api/user";
import { followUser, disFollowUser } from "../../api/popular";

const Container = styled.div`
  outline: 1px solid #e6ecf0;
  padding: 0;
  width: 100%;
  height: 100%;
  border: ${style.styledBorder};
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  height: 59px;
  margin-top: 16px;
  border-bottom: ${style.styledBorder};
  display: flex;
  align-items: center;
  padding: 0 30px;
  .icon {
    cursor: pointer;
  }
`;

const UserNameWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const UserName = styled.h5`
  width: 100%;
  font-weight: 700;
  margin-bottom: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const UserPostCount = styled.p`
  font-size: 13px;
  color: #6c757d;
  margin: 0;
`;

const StyledLink = styled.div`
  margin: 0;
  padding: 0;
`;

// component
const UserFollowers = () => {
  const { id: userId } = useParams();
  const localId = localStorage.getItem("userID");
  const {
    userData,
    otherUserData,
    handleFollowState,
    userFollowers,
    setUserFollowers,
    handleFollowers,
    handleStorage,
    handleUpdatedOtherUserData,
    handleUpdatedUserData,
    otherUserFollowers,
    setOtherUserFollowers,
  } = useContext(UserContext);
  const navigate = useNavigate();

  // 驗證 token
  useAuthValitate("/login");

  // 獲取user資料 (reload後UserContext值會不見，需要重取)
  useEffect(() => {
    handleStorage(userId);
  }, []);

  // 獲取user追隨中
  useEffect(() => {
    const getUserFollower = async () => {
      try {
        const follower = await getUserFollowers(
          userId ? parseInt(userId) : null
        );
        if (parseInt(userId) === parseInt(localId)) {
          setUserFollowers(follower);
        } else {
          setOtherUserFollowers(follower);
        }
      } catch (error) {
        throw error;
      }
    };
    getUserFollower();
  }, []);

  // 點擊切換 isFollowed 狀態
  const handleFollow = async (id) => {
    try {
      if (
        userFollowers.find((user) => user.Follower.id === id).Follower
          .isFollowed
      ) {
        await disFollowUser({ followingId: id });
        if (parseInt(userId) === parseInt(localId)) {
          handleUpdatedUserData();
        } else {
          handleUpdatedOtherUserData(id);
        }
      } else {
        await followUser({ id });
        if (parseInt(userId) === parseInt(localId)) {
          handleUpdatedUserData();
        } else {
          handleUpdatedOtherUserData(id);
        }
      }

      // 變更 popularbar
      handleFollowState(id);
      handleFollowers(id);
    } catch (error) {
      console.error("Error occur:", error);
    }
  };

  return (
    <>
      <Container>
        <StyledLink onClick={() => navigate(`/user/${userId}`)}>
          <Header>
            <LeftArrow className="icon" />

            <UserNameWrapper>
              <UserName>
                {parseInt(userId) === parseInt(localId)
                  ? userData.name
                  : otherUserData.name}
              </UserName>
              <UserPostCount>
                {parseInt(userId) === parseInt(localId)
                  ? userData.tweetsCount
                  : otherUserData.tweetsCount}{" "}
                推文
              </UserPostCount>
            </UserNameWrapper>
          </Header>
        </StyledLink>
        <FollowrSubTool activePage="followers" />
        {parseInt(userId) === parseInt(localId)
          ? userFollowers.map((data) => (
              <FollowCard
                key={data.followerId}
                id={data.Follower.id}
                name={data.Follower.name}
                avatar={data.Follower.avatar}
                introduction={data.Follower.introduction}
                isFollowed={data.Follower.isFollowed}
                onClick={() => handleFollow(data.Follower.id)}
              />
            ))
          : otherUserFollowers.map((data) => (
              <FollowCard
                key={data.followerId}
                id={data.Follower.id}
                name={data.Follower.name}
                avatar={data.Follower.avatar}
                introduction={data.Follower.introduction}
                isFollowed={data.Follower.isFollowed}
                onClick={() => handleFollow(data.Follower.id)}
              />
            ))}
      </Container>
    </>
  );
};

export default UserFollowers;
