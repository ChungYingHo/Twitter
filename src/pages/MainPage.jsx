import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/main/PostCard";
import PopupModal from "../components/PopupModal";
import NewPost from "../components/main/NewPost";
import NewReply from "../components/reply/NewReply";
import * as style from "../components/common/common.styled";
import { UserContext } from "../context/UserContext";
import { usePopup } from "../context/Popup";
// 引用 api
import { getTweets, postTweets } from "../api/main";
import { checkPermission } from "../api/Permission";
import { getUser } from "../api/user";

const Container = styled.div`
  padding: 0;
  width: 56.2%;
  border: ${style.styledBorder};
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  height: 51px;
  margin-top: 24px;
  border-bottom: ${style.styledBorder};
  h4 {
    font-weight: 700;
    font-size: 24px;
    margin-left: 24px;
  }
`;

const PostContainer = styled.div`
  height: 130px;
  margin-top: 24px;
  border-bottom: ${style.colors.lightGray} solid 10px;
  position: relative;
`;

const PostTitle = styled.div`
  width: 558.61px;
  height: 50px;
  margin-left: 24px;
  display: flex;
  align-items: center;
  img {
    ${style.styledImg};
    margin-right: 8px;
  }
  h5 {
    font-size: 18px;
    font-weight: 700;
    color: ${style.colors.darkGray};
  }
`;

const CardContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Btn = styled(style.StyledBtn)`
  width: 64.5px;
  height: 40px;
  position: absolute;
  bottom: 8px;
  right: 24px;
`;

const MainPage = () => {
  const { isNewPostOpen, openNewPost, closeNewPost, isNewReplyOpen, closeNewReply, openNewReply, posts, setPosts } = usePopup()
  const { userData, setUserData } = useContext(UserContext);
  const [postContent, setPostContent] = useState("");
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

  // 抓取所有貼文
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const tweetData = await getTweets();
        const sortedTweets = tweetData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedTweets);
      } catch (error) {
        console.error("Fetching Tweets Failed:", error);
      }
    };
    fetchTweets();
  }, []);

  // 發送貼文
  const handlePostSubmit = async () => {
    try {
      const response = await postTweets({ description: postContent });
      console.log("Post successful:", response);
      // 清空 textarea 內容
      setPostContent("");
      // 刷新主畫面上的貼文列表
      const updatedTweets = await getTweets();
      const sortedTweets = updatedTweets.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedTweets);
      // 關閉發文彈出視窗
      closeNewPost();
    } catch (error) {
      console.error("Posting Tweet Failed:", error);
    }
  }

  // 首頁回覆
  const [selectedPost, setSelectedPost] = useState(null)
  const handlePostCardClick = (post) => {
    setSelectedPost(post)
    openNewReply();
  }

  return (
    <>
      <Container>
        <Header>
          <h4>首頁</h4>
        </Header>

        <PostContainer onClick={openNewPost}>
          <PostTitle>
            <img src={userData.avatar} alt="avatar" />
            <h5>有什麼新鮮事？</h5>
          </PostTitle>
          <Btn>推文</Btn>
        </PostContainer>

        <PopupModal isOpen={isNewPostOpen} closeModal={closeNewPost}>
          <NewPost
            postContent={postContent}
            setPostContent={setPostContent}
            handlePostSubmit={handlePostSubmit}
          />
        </PopupModal>

        <PopupModal isOpen={isNewReplyOpen} closeModal={closeNewReply}>
          {selectedPost && (
            <NewReply
              name={selectedPost.User.name}
              id={selectedPost.id}
              account={selectedPost.User.account}
              timestamp={selectedPost.createdAt}
              avatar={selectedPost.User.avatar}
              content={selectedPost.description}
              setPosts={setPosts}
            />
          )}
        </PopupModal>

        <CardContainer>
          {posts.map((data) => {
            return (
              <div key={data.id} className="post-link">
                <PostCard
                  key={data.id}
                  id={data.id}
                  userId={data.User.id}
                  name={data.User.name}
                  account={data.User.account}
                  avatar={data.User.avatar}
                  content={data.description}
                  timestamp={data.createdAt}
                  reply={data.repliesCount}
                  like={data.likesCount}
                  onPostCardClick={() => handlePostCardClick(data)}
                />
              </div>
            );
          })}
        </CardContainer>
      </Container>
    </>
  );
};

export default MainPage;
