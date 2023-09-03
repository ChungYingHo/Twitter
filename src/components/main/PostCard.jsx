import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TimeDiff from "./TimeDiff";
import { ReactComponent as Like } from "../../assets/like.svg";
import { ReactComponent as Reply } from "../../assets/reply.svg";
import { ReactComponent as FilledLike } from "../../assets/filledlike-xs.svg";
import * as style from "../common/common.styled";
import { likeTweet, dislikeTweet, getTweets } from "../../api/main";
import { usePopup } from "../../context/Popup";

const Container = styled.div`
  padding: 16px 0;
  height: fit-content;
  max-width: 100%;
  border-bottom: ${style.styledBorder};
  display: flex;
  img {
    ${style.styledImg};
    margin-left: 24px;
  }
`;

const Post = styled.div`
  height: 100%;
  overflow: hidden;
  margin-right: 24px;
  margin-left: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  .content {
    height: auto;
    ${style.styledContentFont};
    overflow-wrap: break-word;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .name {
    ${style.styledName}
    max-width: 30%;
  }
  .account {
    ${style.styledAccount}
    max-width: 20%;
    margin-left: 8px;
  }
  div {
    ${style.styledAccount}
  }
`;

const Interact = styled.div`
  height: 16px;
  width: 120px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  div {
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      ${style.styledIconFont}
      color: ${style.colors.darkGray};
    }
  }
  .icon{
    cursor: pointer;
  }
`;

export default function PostCard({
  id,
  name,
  account,
  avatar,
  content,
  timestamp,
  reply,
  like,
  onPostCardClick,
  userId,
  isLike,
  disableAvatar = false,
  disablePost = false,
  disableReply = false
}) {
  const navigate = useNavigate();
  const {setPosts} = usePopup()

  // 喜愛這篇貼文
  const handleLike = async () => {
    try {
      await likeTweet({ tweet_id: id });
      const updatedPost = await getTweets()
      setPosts(updatedPost);
    } catch (error) {
      throw error;
    }
  };

  // 取消喜愛這篇貼文
  const handleDislike = async () => {
    try {
      await dislikeTweet({ tweet_id: id });
      const updatedPost = await getTweets()
      setPosts(updatedPost);
    } catch (error) {
      throw error;
    }
  }

  return (
    <Container>
      <img
        id={userId}
        src={avatar}
        alt="avatar"
        onClick={(event) => {
          if (disableAvatar) {
            return;
          } else {
            navigate(`/user/${userId}`);
          } 
        }}
        style={{ cursor: disableAvatar ? "default" : "pointer" }}
      />
      <Post>
        <Info>
          <p className="name">{name}</p>
          <p className="account">@{account}</p>
          <div className="time">
            ・<TimeDiff timestamp={timestamp} />
          </div>
        </Info>
        <p
          className="content"
          onClick={() => {
            if (!disablePost) {
              navigate(`/main/${id}`);
            }
          }}
          style={{ cursor: disablePost ? "default" : "pointer" }}
        >
          {content}
        </p>
        <Interact>
          <div
            onClick={!disableReply ? onPostCardClick : null}
            style={{ cursor: disableReply ? "default" : "pointer" }}
          >
            <Reply />
            <p>{reply}</p>
          </div>
          <div>
            {isLike ? <FilledLike onClick={handleDislike} className="icon"/> : <Like onClick={handleLike} className="icon"/>}
            <p>{like}</p>
          </div>
        </Interact>
      </Post>
    </Container>
  );
}
