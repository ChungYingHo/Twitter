import { ReactComponent as LeftArrow } from "../assets/left-arrow.svg";
import OtherUserInfo from "../components/user/OtherUserInfo";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SubToolBar from "../components/user/SubToolBar";
import PostCard from "../components/main/PostCard";
import styled from "styled-components";
import * as style from "../components/common/common.styled";
import ReplyCard from "../components/reply/ReplyCard";
import { UserContext } from "../context/UserContext";
// api
import { checkPermission } from "../api/Permission";
import {
  getUserTweets,
  getUserReplies,
  getUserLikes,
  getUser,
} from "../api/user";

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
  const [activePage, setActivePage] = useState("post");
  const [userTweets, setUserTweets] = useState([]);
  const [userReplies, setUserReplies] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
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
  }, [navigate]);

  // 獲取user資料 (reload後UserContext值會不見，需要重取)
  useEffect(() => {
    const getUserData = async () => {
      try {
        const datas = await getUser();
        setUserData(datas);
      } catch (error) {
        console.error("[getUserData Failed]", error);
      }
    };
    getUserData();
  }, [setUserData]);

  // 獲取user推文
  useEffect(() => {
    const getUserTweet = async () => {
      try {
        const userTweet = await getUserTweets();
        setUserTweets(userTweet);
      } catch (error) {
        console.error("[GetUserData Failed]", error);
      }
    };
    getUserTweet();
  }, [setUserTweets]);

  // 獲取user回覆
  useEffect(() => {
    const getUserReply = async () => {
      try {
        const reply = await getUserReplies();
        setUserReplies(reply);
      } catch (error) {
        console.error("[GetUserData Failed]", error);
      }
    };
    getUserReply();
  }, [setUserReplies]);

  // 獲取user喜歡貼文
  useEffect(() => {
    const getUserLike = async () => {
      try {
        const like = await getUserLikes();
        setUserLikes(like);
        console.log(userLikes);
      } catch (error) {
        console.error("[GetUserData Failed]", error);
      }
    };
    getUserLike();
  }, [setUserLikes]);

  return userData ? (
    <>
      <Container>
        <StyledLink to="/main">
          <UserTittleWrapper>
            <LeftArrow />
            <UserNameWrapper>
              <UserName>{userData.name}</UserName>
              <UserPostCount>{userData.tweetsCount} 推文</UserPostCount>
            </UserNameWrapper>
          </UserTittleWrapper>
        </StyledLink>
        <OtherUserInfo />
        <SubToolBar activePage={activePage} setActivePage={setActivePage} />
        {userTweets && userLikes && userReplies && (
          <SwitchZoneContainer>
            {activePage === "post" &&
              userTweets.map((tweet) => {
                return (
                  <PostCardWrapper key={tweet.id}>
                    <PostCard
                      name={tweet.User.name}
                      account={tweet.User.name}
                      avatar={tweet.User.avatar}
                      content={tweet.description}
                      timestamp={tweet.createdAt}
                      reply={tweet.repliesCount}
                      like={tweet.likesCount}
                    />
                  </PostCardWrapper>
                );
              })}

            {activePage === "reply" &&
              userReplies.map((reply) => {
                return (
                  <ReplyCardWrapper key={reply.TweetId}>
                    <ReplyCard
                      name={userData.name}
                      account={userData.account}
                      avatar={userData.avatar}
                      content={reply.comment}
                      timestamp={reply.createdAt}
                      replyAccount={reply.Tweet.User.account}
                    />
                  </ReplyCardWrapper>
                );
              })}

            {activePage === "like" &&
              userLikes.map((like) => {
                return (
                  <PostCardWrapper key={like.TweetId}>
                    <PostCard
                      name={like.Tweet.User.name}
                      account={like.Tweet.User.name}
                      avatar={like.Tweet.User.avatar}
                      content={like.Tweet.description}
                      timestamp={like.Tweet.createdAt}
                      reply={like.Tweet.repliesCount}
                      like={like.Tweet.likesCount}
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