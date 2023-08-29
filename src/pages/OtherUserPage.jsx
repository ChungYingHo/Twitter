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
import {
  getOtherUser,
  getUserTweets,
  getUserReplies,
  getUserLikes,
  getUserFollowings,
  getUserFollowers,
} from "../api/OtherUser";

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
  const [othersData, setOthersData] = useState();
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

  // 獲取user data
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

  // 獲取user推文
  useEffect(() => {
    const otherUserTweet = async () => {
      try {
        const data = await getUserTweets({ id: parseInt(id) });
        setUserTweets(data);
      } catch (error) {
        console.error();
      }
    };
    otherUserTweet();
  });

  // 獲取user回覆
  useEffect(() => {
    const otherUserReply = async () => {
      try {
        const data = await getUserReplies({ id: parseInt(id) });
        setUserReplies(data);
      } catch (error) {
        console.error();
      }
    };
    otherUserReply();
  });

  // 獲取user喜歡貼文
  useEffect(() => {
    const otherUserLike = async () => {
      try {
        const data = await getUserLikes({ id: parseInt(id) });
        setUserLikes(data);
      } catch (error) {
        console.error();
      }
    };
    otherUserLike();
  });

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
                      name={othersData.name}
                      account={othersData.account}
                      avatar={othersData.avatar}
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
