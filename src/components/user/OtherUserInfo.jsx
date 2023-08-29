import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as MailIcon } from "../../assets/mail.svg";
import { ReactComponent as BellIcon } from "../../assets/bell.svg";

const UserMainContainer = styled.div`
  width: 100%;
  height: 378px;
  position: relative;
  background-color: white;
`;

const UserBanner = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const UserInfoWrapper = styled.div`
  position: relative;
  top: -75px;
`;

const UserPicBtnWrapper = styled.div`
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
`;

const BtnWrapper = styled.div`
  width: 208px;
`;

const IconBorder = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #ff6600;
  border-radius: 50%;
`;

const FollowBtn = styled.button`
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

const UserPic = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid white;
`;

const UserAccountNameWrapper = styled.div`
  margin-top: 5px;
  padding: 0 16px;
`;

const UserName = styled.h5`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 3px;
`;

const UserAccount = styled.p`
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 5px;
`;

const UserIntroduction = styled.p`
  word-wrap: break-word;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  margin-bottom: 5px;
  color: #171725;
`;

const UserFollowWrapper = styled.div`
  display: flex;
`;

const UserFollowbox = styled.div`
  display: flex;
  margin-right: 20px;
`;

const UserFollowTittle = styled.p`
  color: #6c757d;
  font-size: 14px;
`;

const UserFollowNum = styled.p`
  color: #171725;
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #171725;
  margin: 0;
  padding: 0;
`;

const UserInfo = ({
  id,
  userName,
  account,
  intro,
  userBanner,
  avatar,
  followerCount,
  followingCount,
  isFollowed,
  onClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNewPost = () => {
    setIsModalOpen(true);
  };
  const closeNewPost = () => {
    setIsModalOpen(false);
  };

  return (
    <UserMainContainer>
      <UserBanner src={userBanner} />

      <UserInfoWrapper>
        <UserPicBtnWrapper>
          <UserPic src={avatar} />
          <BtnWrapper>
            <IconBorder>
              <MailIcon />
            </IconBorder>
            <IconBorder>
              <BellIcon />
            </IconBorder>
            <MailIcon />
            <FollowBtn $isFollowed={isFollowed} onClick={onClick}>
              {isFollowed ? "正在跟隨" : "跟隨"}
            </FollowBtn>
          </BtnWrapper>
        </UserPicBtnWrapper>

        <UserAccountNameWrapper>
          <UserName>{userName}</UserName>
          <UserAccount>@{account}</UserAccount>

          <UserIntroduction>{intro}</UserIntroduction>

          <UserFollowWrapper>
            <StyledLink to="/user/following">
              <UserFollowbox>
                <UserFollowNum>{followingCount}個</UserFollowNum>
                <UserFollowTittle>跟隨中</UserFollowTittle>
              </UserFollowbox>
            </StyledLink>

            <StyledLink to="/user/followers">
              <UserFollowbox>
                <UserFollowNum>{followerCount}位</UserFollowNum>
                <UserFollowTittle>跟隨者</UserFollowTittle>
              </UserFollowbox>
            </StyledLink>
          </UserFollowWrapper>
        </UserAccountNameWrapper>
      </UserInfoWrapper>
    </UserMainContainer>
  );
};

export default UserInfo;
