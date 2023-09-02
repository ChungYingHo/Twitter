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
import { getUserFollowings } from "../../api/user";
import { followUser, disFollowUser } from "../../api/popular";
import { UserContext } from "../../context/UserContext";
import { useAuthValitate } from "../../utils/authValidate";

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

const StyledLink = styled.div`
  margin: 0;
  padding: 0;
`;

// component
const UserFollowing = () => {
  const { id: userId } = useParams();
  const localId = localStorage.getItem("userID");
  const { userData, otherUserData, handleFollowState, userFollowings, setUserFollowings, handleFollowings, handleStorage, handleUpdatedUserData, handleUpdatedOtherUserData, otherUserFollowings, setOtherUserFollowings } = useContext(UserContext);
  const navigate = useNavigate()


  // 驗證 token
  useAuthValitate('/login')

  // 獲取user資料 (reload後UserContext值會不見，需要重取)
  useEffect(() => {
    handleStorage(userId)
  }, []);

  // 獲取use跟隨中
  useEffect(() => {
    const getUserFollowing = async () => {
      try {
        const following = await getUserFollowings(
          userId ? parseInt(userId) : null
        );
        if(parseInt(userId) === parseInt(localId)){
          setUserFollowings(following);
        } else {
          setOtherUserFollowings(following)
        }
      } catch (error) {
        console.error("[GetUserData Failed]", error);
      }
    };
    getUserFollowing();
  }, []);

  // 點擊切換 isFollowed 狀態
  const handleFollow = async (id) => {
    try {
      if (
        userFollowings.find((user) => user.Following.id === id).Following
          .isFollowed
      ) {
        await disFollowUser({ followingId: id });
        if(parseInt(userId) === parseInt(localId)){
          handleUpdatedUserData()
        } else {
          handleUpdatedOtherUserData(id)
        }
      } else {
        await followUser({ id });
        if(parseInt(userId) === parseInt(localId)){
          handleUpdatedUserData()
        } else {
          handleUpdatedOtherUserData(id)
        }
      }
      // 變更 popularbar
      handleFollowState(id)
      handleFollowings(id)

    } catch (error) {
      console.error("Error occur:", error);
    }
  };

  return (
    <>
      <Container>
        <StyledLink onClick={()=>navigate(`/user/${userId}`)}>
          <Header>
            <LeftArrow />
            <HeaderTittleWrapper>
              <h5>{parseInt(userId) === parseInt(localId) ? userData.name : otherUserData.name}</h5>
              <p>{parseInt(userId) === parseInt(localId) ? userData.tweetsCount : otherUserData.tweetsCount} 推文</p>
            </HeaderTittleWrapper>
          </Header>
        </StyledLink>
        <FollowrSubTool activePage="following" />
        {parseInt(userId) === parseInt(localId)
          ? userFollowings.map((data) => (
              <FollowCard
                key={data.Following.id}
                id={data.Following.id}
                name={data.Following.name}
                avatar={data.Following.avatar}
                introduction={data.Following.introduction}
                isFollowed={data.Following.isFollowed}
                onClick={() => handleFollow(data.Following.id)}
              />
            ))
          : otherUserFollowings.map((data) => (
              <FollowCard
                key={data.Following.id}
                id={data.Following.id}
                name={data.Following.name}
                avatar={data.Following.avatar}
                introduction={data.Following.introduction}
                isFollowed={data.Following.isFollowed}
                onClick={() => handleFollow(data.Following.id)}
              />
            ))}
      </Container>
    </>
  );
};

export default UserFollowing;
