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
  outline: green solid 2px;
  padding: 0;
  width: 56.2%;
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

  h5 {
    font-weight: 700;
    font-size: 18px;
    margin: 0 0 2px 0;
  }
  p {
    font-size: 13px;
    color: #6c757d;
  }
`;

const HeaderTittleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 16px;
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
  const [userFollowers, setUserFollowers] = useState([]);
  const { userData, setUserData } = useContext(UserContext);
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
    setUserData([]);
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

  console.log("userData", userData);

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
  }, [userFollowers]);

  console.log("userFollowers", userFollowers);

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
      );
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
            <HeaderTittleWrapper>
              <h5>{userData.name}</h5>
              <p>{userData.tweetsCount} 推文</p>
            </HeaderTittleWrapper>
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
