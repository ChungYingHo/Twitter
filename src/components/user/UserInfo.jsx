import styled from "styled-components";
import UserEdit from "./UserEdit";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PopupModal from "../PopupModal";
import { UserContext } from "../../context/UserContext";
import { editUser, getUser } from "../../api/user";
import { ReactComponent as MailIcon } from "../../assets/mail.svg";
import { ReactComponent as BellIcon } from "../../assets/bell.svg";
import { followUser, disFollowUser } from "../../api/popular";

const UserMainContainer = styled.div`
  width: 100%;
  height: 378px;
  position: relative;
  background-color: white;
`;

const UserBanner = styled.img`
  width: 100%;
  height: 200px;
  object-fit: fill;
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

const BtnWrapper = styled.div`
  width: 208px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 86px;
`;

const IconBorder = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #ff6600;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
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

const StyledMsg = styled.p`
  color: #ff6600;
  font-size: 16px;
  font-weight: 700;
  position: relative;
  right: 16px;
  top: 8px;
`;

const UserInfo = ({ userId, isFollowed }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState();
  const [introduction, setIntro] = useState();
  const [uploadBanner, setUploadBanner] = useState(null);
  const [uploadAvatar, setUploadAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const openNewPost = () => {
    setIsModalOpen(true);
  };
  const closeNewPost = () => {
    setIsModalOpen(false);
  };

  const handleChangeName = (newName) => {
    setName(newName);
  };

  const handleChangeIntro = (newIntro) => {
    setIntro(newIntro);
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadBanner(file);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadAvatar(file);
    }
  };

  const handleClick = async () => {
    try {
      const updateUserData = {
        name: name,
        introduction: introduction,
        banner: uploadBanner,
        avatar: uploadAvatar,
      };
      setIsLoading(true);
      const resData = await editUser(updateUserData);

      if (resData.status === "success") {
        console.log("resData", resData);
        setUploadBanner(null);
        setUserData(resData.data.user);
        setErrorMessage(null);
        console.log("EditUser updated successfully in UserInfo!");
      } else if (resData.status === "error") {
        setErrorMessage(resData.message);
      }
    } catch (error) {
      setErrorMessage(" Something went wrong ...");
      console.error("[editUser failed in UserPage]", error);
    } finally {
      setIsLoading(false);
      setErrorMessage(null);
      setIsModalOpen(false);
    }
  };

  const handleFollow = async (userId) => {
    console.log("userId in handleFollow", userId);

    try {
      if (isFollowed) {
        await disFollowUser({ followingId: userId });
        const updatedData = await getUser(userId);
        setUserData(updatedData);
      } else {
        await followUser(userId);
        const updatedData = await getUser(userId);
        setUserData(updatedData);
        console.log("data of followUser", userData);
      }
    } catch (error) {
      console.error("Error occur:", error);
      console.log("userId in handleFollow", userId);
    }
  };

  return (
    <UserMainContainer>
      <UserBanner src={userData.banner} />

      <UserInfoWrapper>
        <UserPicBtnWrapper>
          <UserPic src={userData.avatar} />
          {userId >= 0 ? (
            <BtnWrapper>
              <IconBorder>
                <MailIcon />
              </IconBorder>
              <IconBorder>
                <BellIcon />
              </IconBorder>
              <FollowBtn
                $isFollowed={isFollowed}
                onClick={() => handleFollow(userId)}
              >
                {isFollowed ? "正在跟隨" : "跟隨"}
              </FollowBtn>
            </BtnWrapper>
          ) : (
            <UserEditBtn onClick={openNewPost}>編輯個人資料</UserEditBtn>
          )}
        </UserPicBtnWrapper>

        <PopupModal
          isOpen={isModalOpen}
          closeModal={closeNewPost}
          headerTitle={<HeaderTittle>編輯個人資料</HeaderTittle>}
          headerButton={
            errorMessage ? (
              <div style={{ border: " 2px solid red " }}>{errorMessage}</div>
            ) : isLoading ? (
              <StyledMsg>儲存中...</StyledMsg>
            ) : (
              <HeaderBtn onClick={handleClick}>儲存</HeaderBtn>
            )
          }
        >
          <UserEdit
            onNameChange={handleChangeName}
            onIntroChange={handleChangeIntro}
            onBannerChange={handleBannerChange}
            uploadBanner={uploadBanner}
            uploadAvatar={uploadAvatar}
            setUploadBanner={setUploadBanner}
            onAvatarChange={handleAvatarChange}
          />
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
