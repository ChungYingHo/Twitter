import styled from "styled-components";
import * as style from "../common/common.styled";
import { ReactComponent as LeftArrow } from "../../assets/left-arrow.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import FollowrSubTool from "./FollowSubTool";
import FollowCard from "./FollowCard";
// api
import { checkPermission } from "../../api/Permission";
import { getUserFollowers, getUser } from "../../api/user";
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
`;

const UserNameWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 16px;
  margin-bottom: 16px;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0;
  padding: 0;
  color: #171725;
  &:hover {
    color: #171725;
  }
`;

const UserFollowers = () => {
  const { id: userId } = useParams();

  const {
    userData,
    setUserData,
    handleFollowState,
    userFollowers,
    setUserFollowers,
    handleFollowers,
  } = useContext(UserContext);

  const navigate = useNavigate();

  // 驗證 token
  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem("UserToken");
      if (!authToken) {
        navigate("/login");
      }
      const result = await checkPermission(authToken);
      if (!result) {
        navigate("/login");
      }
    };

    checkTokenIsValid();
  }, [navigate]);

  // 獲取user資料 (reload後UserContext值會不見，需要重取)
  useEffect(() => {
    const getUserData = async () => {
      try {
        const datas = await getUser(userId ? parseInt(userId) : null);
        setUserData(datas);
      } catch (error) {
        console.error("[getUserData Failed]", error);
      }
    };
    getUserData();
  }, [setUserData]);

  // 獲取user追隨中
  useEffect(() => {
    const getUserFollower = async () => {
      try {
        const follower = await getUserFollowers(
          userId ? parseInt(userId) : null
        );
        setUserFollowers(follower);
      } catch (error) {
        console.error("[GetUserData Failed]", error);
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
      } else {
        await followUser({ id });
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
        <StyledLink to="/user">
          <Header>
            <LeftArrow />
            <UserNameWrapper>
              <UserName>{userData.name}</UserName>
              <UserPostCount>{userData.tweetsCount} 推文</UserPostCount>
            </UserNameWrapper>
          </Header>
        </StyledLink>
        <FollowrSubTool activePage="followers" />
        {userFollowers.map((data) => {
          return (
            <FollowCard
              key={data.followerId}
              id={data.Follower.id}
              name={data.Follower.name}
              avatar={data.Follower.avatar}
              introduction={data.Follower.introduction}
              isFollowed={data.Follower.isFollowed}
              onClick={() => handleFollow(data.Follower.id)}
            />
          );
        })}
      </Container>
    </>
  );
};

export default UserFollowers;
