import styled from "styled-components";
import { useState } from "react";
import dummyUserPic from "../../assets/dummyUserPic.jpg";
import defaultUserBanner from "../../assets/defaultUserBanner.png";
import AuthInput from "../AuthInput";
import { ReactComponent as PhotoIcon } from "../../assets/photo.svg";

const PopupContainer = styled.div`
  border: 1px solid red;
  height: 560px;
  border-radius: 10px;
  position: relative;
`;

const PopupBanner = styled.img`
  width: 100%;
  height: 200px;
  opacity: 75%;
`;

const MainWrapper = styled.div`
  position: relative;
  top: -70px;
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
  border: 5px solid white;
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
  z-index: 99;
`;

const NameInputContainer = styled.div`
  border: 1px solid green;
  height: 54px;
  margin-bottom: 20px;
`;

const IntroInputContainer = styled.div`
  border: 1px solid pink;
  margin-bottom: 20px;
`;

const UserEdit = () => {
  const [name, setName] = useState("");
  const [introduction, setIntro] = useState("");

  return (
    <div className="col">
      <PopupContainer>
        <PopupBanner src={defaultUserBanner} />
        <MainWrapper>
          <PicWrapper>
            <PopupUserPic src={dummyUserPic} />
          </PicWrapper>
          <PhotoIconWrapper>
            <PhotoIcon />
          </PhotoIconWrapper>

          <NameInputContainer>
            <AuthInput
              label={"名稱"}
              name={name}
              value={name}
              placeholder={"請輸入帳號"}
              onChange={(nameInput) => setName(nameInput)}
            />
          </NameInputContainer>

          <IntroInputContainer>
            <AuthInput
              label={"自我介紹"}
              name={introduction}
              value={introduction}
              placeholder={"Egg Head"}
              onChange={(introInput) => setIntro(introInput)}
            />
          </IntroInputContainer>
        </MainWrapper>
      </PopupContainer>
    </div>
  );
};

export default UserEdit;
