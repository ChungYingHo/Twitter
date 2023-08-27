import styled from "styled-components";
import * as style from "../common/common.styled";

const Container = styled.div`
  border: 1px solid blue;
  min-height: 143px;
  height: fit-content;
  max-width: 100%;
  border-bottom: ${style.styledBorder};
  display: flex;
  margin: 16px 0;
  img {
    ${style.styledImg};
    margin-left: 24px;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const MainWrapper = styled.div`
  width: 552px;
  margin-left: 8px;
  padding-right: 15px;
`;

const TopWrapper = styled.div`
  border: 1px solid green;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  border: 1px solid red;
  width: 430px;
  overflow-wrap: break-word;
`;

const Btn = styled.button`
  height: 40px;
  border-radius: 50px;
  ${({ $isFollowed }) =>
    $isFollowed
      ? `width: 96px;
             background-color: #ff6600;
             border: #ff6600 solid 1px;
             color: #ffffff;`
      : `width: 64px;
             background-color: #ffffff;
             border: #ff6600 solid 1px;
             color: #ff6600;`}
  &:active {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) inset;
  }
`;

const UserIntroWrapper = styled.div`
  width: 100%;
  height: 78px;
  margin-top: 8px;

  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
`;

const UserIntro = styled.p`
  font-size: 16px;
  line-height: 26px;
  font-weight: 400;
  color: #171725;
  word-wrap: break-word;
`;

export default function FollowCard({
  name,
  avatar,
  introduction,
  isFollowed,
  onClick,
}) {
  return (
    <Container>
      <Avatar src={avatar} alt="avatar" />
      <MainWrapper>
        <TopWrapper>
          <Name>{name}</Name>
          <Btn $isFollowed={isFollowed} onClick={onClick}>
            {isFollowed ? "正在跟隨" : "跟隨"}
          </Btn>
        </TopWrapper>
        <UserIntroWrapper>
          <UserIntro>{introduction}</UserIntro>
        </UserIntroWrapper>
      </MainWrapper>
    </Container>
  );
}
