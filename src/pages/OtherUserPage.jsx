import { ReactComponent as LeftArrow } from "../assets/left-arrow.svg";
import OtherUserInfo from "../components/user/OtherUserInfo";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SubToolBar from "../components/user/SubToolBar";
import PostCard from "../components/main/PostCard";
import styled from "styled-components";
import * as style from "../components/common/common.styled";
import ReplyCard from "../components/reply/ReplyCard";
import { UserContext } from "../context/UserContext";
// api
import { checkPermission } from "../api/Permission";
import { getOtherUser } from "../api/OtherUser";

// dummyData
import posts from "../dummyData/posts";

const Container = styled.div`
  outline: green solid 2px;
  padding: 0;
  width: 56.2%;
  border: ${style.styledBorder};
  position: relative;
`;

const UserTittleWrapper = styled.div`
  padding: 0 30px;
  width: 100%;
  height: 51px;
  margin-top: 24px;

  display: flex;
  align-items: center;
`;

const UserNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 1px;
  margin-left: 16px;
`;

const UserName = styled.h5`
  font-weight: 700;
  margin-bottom: 0;
`;

const UserPostCount = styled.p`
  font-size: 13px;
  color: #6c757d;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #171725;
  margin: 0;
  padding: 0;

  &:hover {
    color: #171725;
  }
`;

const SwitchZoneContainer = styled.div`
  width: 100%;
  height: 660px;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const PostCardWrapper = styled.div`
  padding-bottom: 16px;
`;

const ReplyCardWrapper = styled.div`
  padding-bottom: 16px;
`;
const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("post");
  const [userTweets, setUserTweets] = useState([]);
  const [userReplies, setUserReplies] = useState([]);
  const [userLikes, setUserLikes] = useState([]);

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

  // 獲取特定使用者資料
  const [othersData, setOthersData] = useState();
  useEffect(() => {
    const otherUserData = async () => {
      try {
        const data = await getOtherUser({ id: parseInt(id) });
        setOthersData(data);
      } catch (error) {
        console.log("Get OtherUserData failed in OtherUserPage", error);
      }
    };
    otherUserData();
  }, [id]);

  console.log("get user data by id", othersData);

  return othersData ? (
    <>
      <Container>
        <StyledLink to="/main">
          <UserTittleWrapper>
            <LeftArrow />
            <UserNameWrapper>
              <UserName>{othersData.name}</UserName>
              <UserPostCount>{othersData.tweetsCount} 推文</UserPostCount>
            </UserNameWrapper>
          </UserTittleWrapper>
        </StyledLink>
        <OtherUserInfo
          id={othersData.id}
          userName={othersData.name}
          account={othersData.account}
          intro={othersData.introduction}
          userBanner={othersData.banner}
          avatar={othersData.avatar}
          followerCount={othersData.followersCount}
          followingCount={othersData.followingsCount}
          isFollowed={othersData.isFollowed}
        />
        <SubToolBar activePage={activePage} setActivePage={setActivePage} />
        {userTweets && userLikes && userReplies && (
          <SwitchZoneContainer>
            {activePage === "post" &&
              posts.map((tweet) => {
                return (
                  <PostCardWrapper key={tweet.id}>
                    <PostCard
                      name={tweet.name}
                      account={tweet.name}
                      avatar={tweet.avatar}
                      content={tweet.description}
                      timestamp={tweet.createdAt}
                      reply={tweet.repliesCount}
                      like={tweet.likesCount}
                    />
                  </PostCardWrapper>
                );
              })}

            {activePage === "reply" &&
              posts.map((reply) => {
                return (
                  <ReplyCardWrapper key={reply.TweetId}>
                    <ReplyCard
                      name={reply.name}
                      account={reply.account}
                      avatar={reply.avatar}
                      content={reply.comment}
                      timestamp={reply.createdAt}
                      replyAccount={reply.account}
                    />
                  </ReplyCardWrapper>
                );
              })}

            {activePage === "like" &&
              posts.map((like) => {
                return (
                  <PostCardWrapper key={like.TweetId}>
                    <PostCard
                      name={like.name}
                      account={like.name}
                      avatar={like.avatar}
                      content={like.description}
                      timestamp={like.createdAt}
                      reply={like.repliesCount}
                      like={like.likesCount}
                    />
                  </PostCardWrapper>
                );
              })}
          </SwitchZoneContainer>
        )}
      </Container>
    </>
  ) : null;
};

export default UserPage;
