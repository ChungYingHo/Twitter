import { ReactComponent as LeftArrow } from "../assets/left-arrow.svg";
import { Link } from "react-router-dom";
import PopularBar from "../components/PopularBar";
import UserInfo from "../components/user/UserInfo";
import SubToolBar from "../components/user/SubToolBar";
import PostCard from "../components/main/PostCard";
import styled from "styled-components";
import * as style from "../components/common/common.styled";
// import ReplyCard from "../components/reply/ReplyCard";
// import UserEdit from "../components/user/UserEdit";

// dummyData
import posts from "../dummyData/posts";
// import replies from "../dummyData/replies";

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

// const ReplyCardWrapper = styled.div`
//   padding-bottom: 16px;
// `;
const UserPage = () => {
  return (
    <>
      <Container>
        <StyledLink to="/main">
          <UserTittleWrapper>
            <LeftArrow />
            <UserNameWrapper>
              <UserName>Egg Head</UserName>
              <UserPostCount>25 推文</UserPostCount>
            </UserNameWrapper>
          </UserTittleWrapper>
        </StyledLink>
        <UserInfo />
        <SubToolBar />
        <SwitchZoneContainer>
          {posts.map((data) => {
            return (
              <PostCardWrapper>
                <PostCard
                  key={data.id}
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

          {/* 
            {replies.map((reply) => {
              return (
                <ReplyCardWrapper>
                  <ReplyCard
                    key={reply.id}
                    name={reply.User.name}
                    account={reply.User.account}
                    avatar={reply.User.avatar}
                    content={reply.comment}
                    timestamp={reply.createdAt}
                  />
                </ReplyCardWrapper>
              );
            })} */}
        </SwitchZoneContainer>
      </Container>
      <PopularBar />
    </>
  );
};

export default UserPage;
