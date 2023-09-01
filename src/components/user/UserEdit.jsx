import styled from "styled-components";
import { useContext, useRef } from "react";
import AuthInput from "../AuthInput";
import { ReactComponent as PhotoIcon } from "../../assets/photo.svg";
import { ReactComponent as CloseIcon } from "../../assets/close-white.svg";
import { UserContext } from "../../context/UserContext";

const PopupContainer = styled.div`
  width: 100%;
  height: 553px;
  border-radius: 10px;
  position: relative;
  background-color: #ffffff;
`;

const PopupBannerWrapper = styled.div`
  width: 100%;
  object-fit: fill;
  position: relative;
  display: inline-block;

  ${({ $ispreview }) => {
    return (
      $ispreview &&
      `
    &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background-color: #17172580;
    opacity: 75%;
  }
  `
    );
  }}
`;

const PopupBanner = styled.img`
  width: 100%;
  height: 200px;
`;

const BannerIconWrapper = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  top: -200px;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: center;
`;

const MainWrapper = styled.div`
  position: relative;
  top: -275px;
  padding: 0 13px;
`;

const PicWrapper = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
  }
`;

const PopupUserPic = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid #ffffff;
  position: relative;
`;

const PhotoIconWrapper = styled.div`
  width: 140px;
  position: relative;
  top: -72px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameInputContainer = styled.div`
  height: 78px;
  margin-bottom: 8px;
`;

const IntroInputContainer = styled.div`
  height: 171px;
  margin-bottom: 8px;
`;

const UserEdit = ({
  onNameChange,
  onIntroChange,
  onBannerChange,
  uploadBanner,
  setUploadBanner,
  onAvatarChange,
  uploadAvatar,
}) => {
  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const { userData } = useContext(UserContext);

  const handleChangeName = (newName) => {
    onNameChange(newName);
  };

  const handleChangeIntro = (newIntro) => {
    onIntroChange(newIntro);
  };

  const handleOpenBannerInput = () => {
    bannerInputRef.current.click();
  };

  const handleOpenAvatarInput = () => {
    avatarInputRef.current.click();
  };

  const resetFileInput = () => {
    setUploadBanner(null);
  };

  return (
    <PopupContainer>
      <PopupBannerWrapper $ispreview={!uploadBanner}>
        <PopupBanner
          src={
            uploadBanner ? URL.createObjectURL(uploadBanner) : userData.banner
          }
        />
        <BannerIconWrapper>
          {!uploadBanner && <PhotoIcon onClick={handleOpenBannerInput} />}
          {uploadBanner && <CloseIcon onClick={resetFileInput} />}
          <input
            type="file"
            ref={bannerInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={onBannerChange}
          />
        </BannerIconWrapper>
      </PopupBannerWrapper>
      <MainWrapper>
        <PicWrapper>
          <PopupUserPic
            src={
              uploadAvatar ? URL.createObjectURL(uploadAvatar) : userData.avatar
            }
          />
        </PicWrapper>
        <PhotoIconWrapper>
          <PhotoIcon style={{ zIndex: 999 }} onClick={handleOpenAvatarInput} />
          <input
            type="file"
            ref={avatarInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={onAvatarChange}
          />
        </PhotoIconWrapper>

        <NameInputContainer>
          <AuthInput
            label={"名稱"}
            labelfor={"name"}
            inputid={"name"}
            name={userData.name}
            placeholder={userData.name}
            onChange={handleChangeName}
            maxLength={50}
            $inputwarntext={"字數不可超過上限!"}
          />
        </NameInputContainer>

        <IntroInputContainer>
          <AuthInput
            label={"自我介紹"}
            labelfor={"introduction"}
            inputid={"introduction"}
            name={userData.introduction}
            placeholder={userData.introduction}
            onChange={handleChangeIntro}
            isLarge={true}
            maxLength={160}
            $inputwarntext={"字數不可超過上限!"}
          />
        </IntroInputContainer>
      </MainWrapper>
    </PopupContainer>
  );
};

export default UserEdit;
