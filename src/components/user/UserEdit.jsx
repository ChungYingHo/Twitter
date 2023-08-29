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
  object-fit: cover;
  position: relative;
  display: inline-block;

  ${({ isPreview }) => {
    return (
      isPreview &&
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
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconLayoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80px;
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
  z-index: 5;
`;

const NameInputContainer = styled.div`
  height: 54px;
  margin-bottom: 20px;
`;

const IntroInputContainer = styled.div`
  margin-bottom: 20px;
`;

const UserEdit = ({
  onNamenChange,
  onIntroChange,
  onBannerChange,
  uploadBanner,
  setUploadBanner,
}) => {
  const inputRef = useRef(null);

  const { userData } = useContext(UserContext);

  const handleChangeName = (newName) => {
    onNamenChange(newName);
  };

  const handleChangeIntro = (newIntro) => {
    onIntroChange(newIntro);
  };

  const handleOpenFileInput = () => {
    inputRef.current.click();
  };

  const resetFileInput = () => {
    setUploadBanner(null);
  };

  console.log({ uploadBanner });

  return (
    <PopupContainer>
      <PopupBannerWrapper isPreview={!uploadBanner}>
        <PopupBanner
          src={
            uploadBanner ? URL.createObjectURL(uploadBanner) : userData.banner
          }
        />
        <BannerIconWrapper>
          <IconLayoutWrapper>
            {!uploadBanner && <PhotoIcon onClick={handleOpenFileInput} />}
            {uploadBanner && <CloseIcon onClick={resetFileInput} />}
            <input
              type="file"
              ref={inputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={onBannerChange}
            />
          </IconLayoutWrapper>
        </BannerIconWrapper>
      </PopupBannerWrapper>
      <MainWrapper>
        <PicWrapper>
          <PopupUserPic src={userData.avatar} />
        </PicWrapper>
        <PhotoIconWrapper>
          <PhotoIcon />
        </PhotoIconWrapper>

        <NameInputContainer>
          <AuthInput
            label={"名稱"}
            name={userData.name}
            value={userData.name}
            placeholder={"請輸入帳號"}
            onChange={handleChangeName}
          />
        </NameInputContainer>

        <IntroInputContainer>
          <AuthInput
            label={"自我介紹"}
            name={userData.introduction}
            placeholder={"Egg Head"}
            onChange={handleChangeIntro}
            isLarge={true}
            maxLength={"10"}
          />
        </IntroInputContainer>
      </MainWrapper>
    </PopupContainer>
  );
};

export default UserEdit;
