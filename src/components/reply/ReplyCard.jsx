import styled from "styled-components";
import TimeDiff from "../main/TimeDiff";
import * as style from "../common/common.styled";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-height: 149px;
  height: fit-content;
  width: 100%;
  border-bottom: ${style.styledBorder};
  display: flex;
  padding: 16px 24px;

  img {
    ${style.styledImg};
  }
`;

const Post = styled.div`
  width: calc(100% - 74px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-left: 8px;
`;

const Info = styled.div`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

const StyledName = styled.p`
  font-size: 16px;
  font-weight: 700px;
  color: #171725;
  margin: 0;
`;

const StyledAccountTime = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #6c757d;
  margin: 0 0 0 8px;
`;

const StyledReplyWrapper = styled.div`
  display: flex;
  height: 22px;
  margin-bottom: 8px;
`;

const StlyedReply = styled.p`
  color: #6c757d;
  font-size: 14px;
  font-weight: 400;
  margin-right: 4px;
`;

const ReplyAccount = styled.p`
  color: #ff6600;
  font-size: 14px;
  font-weight: 400;
`;

const ReplyContext = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #171725;
  margin: 0;
  word-wrap: break-word;
`;

export default function ReplyCard({
  name,
  account,
  avatar,
  content,
  timestamp,
  replyAccount,
  userId,
  disableLinks = false,
}) {
  const navigate = useNavigate();
  return (
    <Container>
      <img
        src={avatar}
        alt="avatar"
        onClick={(event) => {
          if (!disableLinks) {
            navigate(`/user/${userId}`);
          } else if (!disableLinks) {
            navigate("/user");
          }
        }}
        style={{ cursor: disableLinks ? "default" : "pointer" }}
      />
      <Post>
        <Info>
          <StyledName>{name}</StyledName>
          <StyledAccountTime>
            @{account}・<TimeDiff timestamp={timestamp} />
          </StyledAccountTime>
        </Info>
        <StyledReplyWrapper>
          <StlyedReply>回覆</StlyedReply>
          <ReplyAccount>@{replyAccount}</ReplyAccount>
        </StyledReplyWrapper>
        <ReplyContext>{content}</ReplyContext>
      </Post>
    </Container>
  );
}
