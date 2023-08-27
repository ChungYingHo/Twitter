import { ReactComponent as LeftArrow } from "../assets/left-arrow.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserInfo from "../components/user/UserInfo";
import SubToolBar from "../components/user/SubToolBar";
import PostCard from "../components/main/PostCard";
import styled from "styled-components";
import * as style from "../components/common/common.styled";
import ReplyCard from "../components/reply/ReplyCard";
// api
import { getUser } from "../api/user";
import { checkPermission } from "../api/Permission";

// dummyData
import posts from "../dummyData/posts";
import replies from "../dummyData/replies";

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
  const [userDatas, setUserData] = useState([]);
  const navigate = useNavigate()

  // 驗證 token
    useEffect(() => {
        const checkTokenIsValid = async () => {
        const authToken = localStorage.getItem('UserToken');
        if (!authToken) {
            navigate('/login');
        }
        const result = await checkPermission(authToken);
        if (!result) {
            navigate('/login');
        }
        };

        checkTokenIsValid();
    }, [navigate])

  // 拿取特定使用者資料
  useEffect(() => {
    const getUserData = async () => {
      try {
        const getUserData = await getUser();
        setUserData(getUserData);
      } catch (error) {
        console.error("[GetUserData Failed]", error);
      }
    };
    getUserData();
  }, []);

  console.log("getUserData", userDatas);

  return (
    <>
      <Container>
        <StyledLink to="/main">
          <UserTittleWrapper>
            <LeftArrow />
            <UserNameWrapper>
              <UserName>{userDatas.name}</UserName>
              <UserPostCount>25 推文</UserPostCount>
            </UserNameWrapper>
          </UserTittleWrapper>
        </StyledLink>
        <UserInfo
          name={userDatas.name}
          account={userDatas.account}
          introduction={userDatas.introduction}
          followersCount={userDatas.followersCount}
          followingsCount={userDatas.followingsCount}
          avatar={userDatas.avatar}
          banner={userDatas.banner}
        />
        <SubToolBar activePage={activePage} setActivePage={setActivePage} />
        <SwitchZoneContainer>
          {activePage === "post" &&
            posts.map((data) => {
              return (
                <PostCardWrapper key={data.id}>
                  <PostCard
                    name={data.user.name}
                    account={data.user.name}
                    avatar={data.user.avatar}
                    content={data.description}
                    timestamp={data.createdAt}
                    reply={data.repliesCount}
                    like={data.likesCount}
                  />
                </PostCardWrapper>
              );
            })}

          {activePage === "reply" &&
            replies.map((reply) => {
              return (
                <ReplyCardWrapper key={reply.id}>
                  <ReplyCard
                    name={reply.User.name}
                    account={reply.User.account}
                    avatar={reply.User.avatar}
                    content={reply.comment}
                    timestamp={reply.createdAt}
                  />
                </ReplyCardWrapper>
              );
            })}

          {activePage === "like" &&
            posts.map((data) => {
              return (
                <PostCardWrapper key={data.id}>
                  <PostCard
                    name={data.user.name}
                    account={data.user.name}
                    avatar={data.user.avatar}
                    content={data.description}
                    timestamp={data.createdAt}
                    reply={data.repliesCount}
                    like={data.likesCount}
                  />
                </PostCardWrapper>
              );
            })}
        </SwitchZoneContainer>
      </Container>
    </>
  );
};

export default UserPage;
