import styled from "styled-components";
import * as style from "../common/common.styled";
import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";
import clsx from "clsx";

const Container = styled.div`
  height: fit-content;
  min-height: 280px;
  margin-top: 16px;
  .info {
    display: flex;
    img {
      ${style.styledImg}
      margin-left: 16px;
      margin-right: 8px;
    }
    textarea {
      width: calc(100% - 32px);
      height: fit-content;
      min-height: 200px;
      resize: none;
      border: transparent solid;
      outline: none;
      margin-right: 16px;
    }
  }
`;

const Footer = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  .warning{
    margin: 0 16px 0 0;
    font-size: 15px;
    font-weight: 500;
    color: ${style.colors.darkGray};
    &.overwrite{
      color: ${style.colors.orange};
    }
  }
`

const Btn = styled(style.StyledBtn)`
  width: 64px;
  height: 40px;
`;

export default function NewPost({
  postContent,
  setPostContent,
  handlePostSubmit,
}) {
  const { userData, setUserData } = useContext(UserContext)
  const [isContentEmpty, setIsContentEmpty] = useState(false)
  const contentLength = postContent.trim().length

  const handleClick = () => {
    if (contentLength === 0) {
      setIsContentEmpty(true)
      return;
    } else {
      setIsContentEmpty(false)
      handlePostSubmit()
    }
  }

  const handleTextareaChange = (e) => {
    setPostContent(e.target.value)
    setIsContentEmpty(false)
  }

  return (
    <Container>
      <div className="info">
        <img src={userData.avatar} alt="avatar" />
        <textarea
          minLength="1"
          maxLength="140"
          value={postContent}
          onChange={handleTextareaChange}
          placeholder="有什麼新鮮事？"
        ></textarea>
      </div>
      <Footer>
        <p 
          className={clsx("warning", { 
            overwrite: postContent.trim().length === 140 || isContentEmpty})}>
          {isContentEmpty ? "內容不可空白" : contentLength < 140 ? `${contentLength} / 140 字` : '字數不可超過 140 字'}
        </p>
        <Btn onClick={handleClick}>推文</Btn>
      </Footer>
    </Container>
  );
}
