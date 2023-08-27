import styled from "styled-components";
import UserEdit from "./UserEdit";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PopupModal from "../PopupModal";
import { UserContext } from "../../context/UserContext";

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

const UserEditBtn = styled.button`
  width: 128px;
  height: 40px;
  border: 1px solid #ff6600;
  background-color: white;
  padding: 8px 16px;
  border-radius: 50px;
  color: #ff6600;
  font-size: 14px;
  position: relative;
  top: 85px;
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

const HeaderTittle = styled.h5`
  font-size: 16px;
  color: #1c1c1c;
  font-weight: 700;
  margin: 0;
`;

const HeaderBtn = styled.button`
  width: 64px;
  height: 40px;
  color: white;
  padding: 8px 16px;
  border: 0;
  border-radius: 50px;
  background-color: #ff6600;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #171725;
  margin: 0;
  padding: 0;
`;

const UserInfo = () => {
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const openNewPost = () => {
    setIsNewPostOpen(true);
  };
  const closeNewPost = () => {
    setIsNewPostOpen(false);
  };

  const { userData, setUserData } = useContext(UserContext);

  console.log("data in userInfo", userData);

  return (
    <UserMainContainer>
      <UserBanner src={userData.banner} />

      <UserInfoWrapper>
        <UserPicBtnWrapper>
          <UserPic src={userData.avatar} />
          <UserEditBtn onClick={openNewPost}>編輯個人資料</UserEditBtn>
        </UserPicBtnWrapper>

        <PopupModal
          isOpen={isNewPostOpen}
          closeModal={closeNewPost}
          headerTitle={<HeaderTittle>編輯個人資料</HeaderTittle>}
          headerButton={<HeaderBtn>儲存</HeaderBtn>}
        >
          <UserEdit />
        </PopupModal>

        <UserAccountNameWrapper>
          <UserName>{userData.name}</UserName>
          <UserAccount>@{userData.account}</UserAccount>

          <UserIntroduction>{userData.introduction}</UserIntroduction>

          <UserFollowWrapper>
            <StyledLink to="/user/following">
              <UserFollowbox>
                <UserFollowNum>{userData.followingsCount}個</UserFollowNum>
                <UserFollowTittle>跟隨中</UserFollowTittle>
              </UserFollowbox>
            </StyledLink>

            <StyledLink to="/user/followers">
              <UserFollowbox>
                <UserFollowNum>{userData.followersCount}位</UserFollowNum>
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
