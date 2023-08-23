import styled from "styled-components";
import { useState } from "react";
import Toolbar from "../components/Toolbar";
import PopularBar from "../components/PopularBar";
import PostCard from "../components/PostCard";
// import NewPost from '../components/NewPost';
// 測試資料
import posts from "../dummyData/posts";
import PopupModal from "../components/PopupModal";
import NewPost from "../components/NewPost";

const Container = styled.div`
  padding: 0;
  border: #e6ecf0 solid 1px;
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  height: 51px;
  margin-top: 24px;
  border-bottom: #e6ecf0 solid 1px;
  h4 {
    font-weight: 700;
    font-size: 24px;
    margin-left: 24px;
  }
`;

const PostContainer = styled.div`
  height: 130px;
  margin-top: 24px;
  border-bottom: #e6ecf0 solid 10px;
  position: relative;
`;

const Title = styled.div`
  width: 558.61px;
  height: 50px;
  margin-left: 24px;
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 8px;
    /* 暫時的 */
    background-color: #c4c4c4;
  }
  h5 {
    font-size: 18px;
    font-weight: 700;
    color: #6c757d;
  }
`;

const Btn = styled.button`
  width: 64.5px;
  height: 40px;
  border-radius: 50px;
  border: transparent solid;
  background-color: #ff6600;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  /* 不確定 XD */
  bottom: 8px;
  right: 24px;

  &:active {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) inset;
  }
`;

const CardContainer = styled.div`
  margin-top: 16px;
`;

const MainPage = () => {
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  // test
  const openNewPost = () => {
    setIsNewPostOpen(true);
  };
  const closeNewPost = () => {
    setIsNewPostOpen(false);
  };

  return (
    <>
      <Toolbar />
      <Container className="col">
        <Header>
          <h4>首頁</h4>
        </Header>
        <PostContainer onClick={openNewPost}>
          <Title>
            <img src="https://i.imgur.com/jUZg5Mm.png" alt="avatar" />
            <h5>有什麼新鮮事？</h5>
          </Title>
          <Btn>推文</Btn>
        </PostContainer>

        <PopupModal isOpen={isNewPostOpen} closeModal={closeNewPost}>
          <NewPost />
        </PopupModal>

        <CardContainer>
          {posts.map((data) => {
            return (
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
            );
          })}
        </CardContainer>
      </Container>
      <PopularBar />
    </>
  );
};

export default MainPage;
