import styled from "styled-components";
import { useState } from "react";
import * as style from '../common/common.styled'
import TimeDiff from "../main/TimeDiff";
import clsx from "clsx";

const Container = styled.div`
    margin-top: 16px;
    height: 460px;
    position: relative;
`

const PostContainer = styled.div`
    width: 100%;
    height: fit-content;
    min-height: 130px;
    display: flex;
    img{
        ${style.styledImg}
        margin: 0 8px 0 16px;
    }
`

const Post = styled.div`
    height: fit-content;
    min-height: 129px;
    width: calc(100% - 74px);
    margin-left: 8px;
    margin-right: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    .content{
        height: 78px;
        ${style.styledContentFont}
        overflow-wrap: break-word;
        margin: 0;
    }
    .reply-for{
        display: flex;
        p{
            color: ${style.colors.orange};
            margin-left: 2px;
            margin: 0;
        }
    }
`

const Info = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    .name{
        ${style.styledName}
    }
    .account{
        ${style.styledAccount}
    }
`

const SubContainer = styled.div`
    height: fit-content;
    min-height: 290px;
    margin-top: 24px;
    .title{
        display: flex;
        position: relative;
        img{
            ${style.styledImg}
            margin: 0 16px;
        }
        textarea {
            width: calc(100% - 32px);
            height: 170px;
            resize: none;
            border: transparent solid;
            outline: none;
            margin: 8px 16px 0 0;
        }
        &::after{
            content: "";
            width: 2px;
            height: 86px;
            background-color: #b5b5be;
            position: absolute;
            top: -96px;
            left: 41px;
            transform: translateX(-50%);
        }
    }
`

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

export default function NewReply({name, account, timestamp, avatar, content, replyContent, setReplyContent, handleReplySubmit}) {
  const [isContentEmpty, setIsContentEmpty] = useState(false)
  const contentLength = replyContent.trim().length

  const handleClick = () => {
    if (contentLength === 0) {
      setIsContentEmpty(true)
      return;
    } else {
      setIsContentEmpty(false)
      handleReplySubmit()
    }
  }

  const handleTextareaChange = (e) => {
    setReplyContent(e.target.value)
    setIsContentEmpty(false)
  }
  
  return (
    <Container>
      <PostContainer>
        <img src={avatar} alt="avatar" />
        <Post>
            <Info>
                <p className='name'>{name}</p>
                <p className='account'>@{account}・<TimeDiff timestamp={timestamp}/></p>
            </Info>
            <p className='content'>{content}</p>
            <div className="reply-for">回覆給 <p className="reply-user">@{account}</p></div>
        </Post>
      </PostContainer>
      <SubContainer>
        <div className="title">
            <img src="https://i.imgur.com/jUZg5Mm.png" alt="avatar" />
            <textarea
            minLength="1"
            maxLength="140"
            value={replyContent}
            onChange={handleTextareaChange}
            placeholder="推你的回覆"
            ></textarea>
        </div>
        <Footer>
            <p 
            className={clsx("warning", { 
                overwrite: replyContent.trim().length === 140 || isContentEmpty})}>
            {isContentEmpty ? "內容不可空白" : contentLength < 140 ? `${contentLength} / 140 字` : '字數不可超過 140 字'}
            </p>
            <Btn onClick={handleClick}>回覆</Btn>
        </Footer>
      </SubContainer>
    </Container>
  );
}