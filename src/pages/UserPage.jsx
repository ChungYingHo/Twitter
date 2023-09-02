// package
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

import { useState, useEffect, useContext } from "react";
// component and style
import { ReactComponent as LeftArrow } from "../assets/left-arrow.svg";
import UserInfo from "../components/user/UserInfo";
import SubToolBar from "../components/user/SubToolBar";
import PostCard from "../components/main/PostCard";
import * as style from "../components/common/common.styled";
import ReplyCard from "../components/reply/ReplyCard";
// api and function
import { useAuthValitate } from "../utils/authValidate";
import {
  getUserTweets,
  getUserReplies,
  getUserLikes
} from "../api/user";
import { UserContext } from "../context/UserContext";

const Container = styled.div`
  padding: 0;
  width: 100%;
  border: ${style.styledBorder};
  position: relative;
`;

const UserTittleWrapper = styled.div`
  padding: 0 30px;
  width: 100%;
  height: 51px;
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

const UserNameWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 1px;
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
  height: fit-content;
`;

const PostCardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// component
const UserPage = () => {
  const { id: userId } = useParams();
  const localId = localStorage.getItem("userID");
  const [activePage, setActivePage] = useState("post");
  const [userTweets, setUserTweets] = useState([]);
  const [userReplies, setUserReplies] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const {
    userData,
    otherUserData,
    handleStorage
  } = useContext(UserContext);

  // 驗證 token
  useAuthValitate("/login");

  // 獲取user資料 (reload後UserContext值會不見，需要重取)
  useEffect(() => {
    handleStorage(userId);
  }, []);

  // 獲取user推文
  useEffect(() => {
    const getUserTweet = async () => {
      try {
        const userTweet = await getUserTweets(userId ? parseInt(userId) : null);
        setUserTweets(userTweet);
      } catch (error) {
        console.error("[GetUserData Failed]", error);
      }
    };
    getUserTweet();
  }, [setUserTweets, userId]);

  // 獲取user回覆
  useEffect(() => {
    const getUserReply = async () => {
      try {
        const reply = await getUserReplies(userId ? parseInt(userId) : null);
        setUserReplies(reply);
      } catch (error) {
        console.error("[GetUserData Failed]", error);
      }
    };
    getUserReply();
  }, [setUserReplies, userId]);

  // 獲取user喜歡貼文
  useEffect(() => {
    const getUserLike = async () => {
      try {
        const like = await getUserLikes(userId ? parseInt(userId) : null);
        setUserLikes(like);
      } catch (error) {
        console.error("[GetUserData Failed]", error);
      }
    };
    getUserLike();
  }, [setUserLikes, userId]);

  return userData ? (
    <>
      <Container>
        <StyledLink to="/main">
          <UserTittleWrapper>
            <LeftArrow />
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
          </UserTittleWrapper>
        </StyledLink>
        <UserInfo />
        <SubToolBar activePage={activePage} setActivePage={setActivePage} />
        {userTweets && userLikes && userReplies && (
          <SwitchZoneContainer>
            {activePage === "post" &&
              userTweets.map((tweet) => {
                return (
                  <PostCardWrapper key={tweet.id}>
                    <PostCard
                      key={tweet.id}
                      name={tweet.User.name}
                      account={tweet.User.account}
                      avatar={tweet.User.avatar}
                      content={tweet.description}
                      timestamp={tweet.createdAt}
                      reply={tweet.repliesCount}
                      like={tweet.likesCount}
                      id={tweet.id}
                      userId={tweet.User.id}
                      disableAvatar={true}
                      disableReply={true}
                    />
                  </PostCardWrapper>
                );
              })}

            {activePage === "reply" &&
              userReplies.map((reply) => {
                return (
                  <ReplyCard
                    key={reply.TweetId}
                    name={
                      parseInt(userId) === parseInt(localId)
                        ? userData.name
                        : otherUserData.name
                    }
                    account={
                      parseInt(userId) === parseInt(localId)
                        ? userData.account
                        : otherUserData.account
                    }
                    avatar={
                      parseInt(userId) === parseInt(localId)
                        ? userData.avatar
                        : otherUserData.avatar
                    }
                    content={reply.comment}
                    timestamp={reply.createdAt}
                    replyAccount={reply.Tweet.User.account}
                    disableLinks={true}
                  />
                );
              })}

            {activePage === "like" &&
              userLikes.map((like) => {
                return (
                  <PostCardWrapper key={like.TweetId}>
                    <PostCard
                      name={like.Tweet.User.name}
                      account={like.Tweet.User.account}
                      avatar={like.Tweet.User.avatar}
                      content={like.Tweet.description}
                      timestamp={like.Tweet.createdAt}
                      reply={like.Tweet.repliesCount}
                      like={like.Tweet.likesCount}
                      isLike={true}
                      id={like.Tweet.id}
                      userId={like.UserId}
                      disableReply={true}
                      disableAvatar={true}
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
