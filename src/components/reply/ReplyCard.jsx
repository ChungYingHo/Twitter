import styled from "styled-components";
import TimeDiff from "../main/TimeDiff";
import * as style from "../common/common.styled";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-height: 200px;
  height: fit-content;
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
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  margin-left: 8px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
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
    max-width: 30%;
    margin-left: 8px;
  }
  div {
    ${style.styledAccount}
  }
`;

const StyledReplyWrapper = styled.div`
  display: flex;
  height: 22px;
  margin-bottom: 8px;
`;

const StlyedReply = styled.p`
  color: #6c757d;
  font-size: 14px;
  margin-right: 4px;
`;

const ReplyAccount = styled.div`
  color: #ff6600;
  font-size: 14px;
  font-weight: 400;
  max-width: 30%;
  .replyaccount {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const ReplyContext = styled.p`
  font-size: 16px;
  color: #171725;
  margin: 0;
  word-wrap: break-word;
  height: fit-content;
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
          <p className="name">{name}</p>
          <p className="account">@{account}</p>
          <div className="time">
            ・<TimeDiff timestamp={timestamp} />
          </div>
        </Info>
        <StyledReplyWrapper>
          <StlyedReply>回覆</StlyedReply>
          <ReplyAccount>
            <p className="replyaccount">@{replyAccount}</p>
          </ReplyAccount>
        </StyledReplyWrapper>
        <ReplyContext>{content}</ReplyContext>
      </Post>
    </Container>
  );
}
