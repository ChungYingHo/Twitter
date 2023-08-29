import styled from "styled-components";
import * as style from "../common/common.styled";
import { ReactComponent as LeftArrow } from "../../assets/left-arrow.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FollowrSubTool from "./FollowSubTool";
import FollowCard from "./FollowCard";
// api
import { checkPermission } from "../../api/Permission";
import { getUserFollowings, getOtherUser } from "../../api/OtherUser";
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

const OtherUserFollowing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userFollowings, setUserFollowings] = useState([]);
  const [othersData, setOthersData] = useState();

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

  // 獲取user data
  useEffect(() => {
    const otherUserData = async () => {
      try {
        const data = await getOtherUser({ id: parseInt(id) });
        setOthersData(data);
      } catch (error) {
        console.log("Get OtherUserData failed in OtherUserFollowing", error);
      }
    };
    otherUserData();
  }, [id]);

  // 獲取use跟隨者
  useEffect(() => {
    const getUserFollowing = async () => {
      try {
        const following = await getUserFollowings({ id: parseInt(id) });
        setUserFollowings(following);
      } catch (error) {
        console.error("[GetOtherUser Data Failed]", error);
      }
    };
    getUserFollowing();
  }, [userFollowings, id]);

  // 點擊切換 isFollowed 狀態
  const handleFollow = async (id) => {
    try {
      if (
        userFollowings.find((user) => user.Following.id === id).Following
          .isFollowed
      ) {
        await disFollowUser({ followingId: id });
      } else {
        await followUser({ id });
      }

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
      );
    } catch (error) {
      console.error("Error occur:", error);
    }
  };

  return (
    <>
      <Container>
        <StyledLink to={`/user/${id}`}>
          <Header>
            <LeftArrow />
            <HeaderTittleWrapper>
              <h5>{othersData?.name}</h5>
              <p>{othersData?.tweetsCount} 推文</p>
            </HeaderTittleWrapper>
          </Header>
        </StyledLink>
        <FollowrSubTool id={id} activePage="following" />
        {userFollowings
          ? userFollowings.map((data) => {
              return (
                <FollowCard
                  key={data.Following.id}
                  id={data.Following.id}
                  name={data.Following.name}
                  avatar={data.Following.avatar}
                  introduction={data.Following.introduction}
                  isFollowed={data.Following.isFollowed}
                  onClick={() => handleFollow(data.Following.id)}
                />
              );
            })
          : null}
      </Container>
    </>
  );
};

export default OtherUserFollowing;
