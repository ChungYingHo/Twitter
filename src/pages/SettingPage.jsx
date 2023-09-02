// package
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
// component and style
import AuthInput from "../components/AuthInput";
import {
  SettingInputContainer,
  SettingTittleContainer,
  SettingTittle,
  SettingButtonWrapper,
  SettingButton,
  SettingInputMainWrapper,
} from "../components/common/setting.styled";
import * as style from "../components/common/common.styled";
// api and function
import { editUser } from "../api/user";
import { useAuthValitate } from "../utils/authValidate";
import { useErrorContext } from "../context/ErrorContext";
import { UserContext } from "../context/UserContext";

const Container = styled.div`
  padding: 0;
  width: 100%;
  height: 100%;
  border: ${style.styledBorder};
  position: relative;
`;

const SettingPage = () => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  // 取得 userdata，並確保 userdata 存在
  const { userData, handleUserData, handleUpdatedUserData } =
    useContext(UserContext);
  const id = localStorage.getItem("userID");
  useEffect(() => {
    handleUserData(id);
  }, [id]);

  useEffect(() => {
    // 當 userData 獲取後，設定相關狀態
    if (userData) {
      setAccount(userData.account);
      setName(userData.name);
      setEmail(userData.email);
    }
  }, [userData]);

  // error control
  const {
    accountError,
    setAccountError,
    nameError,
    setNameError,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    checkPasswordError,
    setCheckPasswordError,
    handleInputClick,
    handleError,
    useResetErrorsEffect,
  } = useErrorContext();
  useResetErrorsEffect();
  // 驗證 token
  useAuthValitate("/login");
  // edit user
  const handleClick = async () => {
    if (
      account.trim().length === 0 ||
      name.trim().length === 0 ||
      email.trim().length === 0
    ) {
      console.log(`warning`);
      style.Toast.fire({
        html: `
          <div style="display:flex; align-items:center">
          <strong style="margin-right: 110px; font-size:16px">請填寫完整資訊</strong>
          <img style="width: 40px" src="/Twitter/error.svg">
          </div>`,
      });
      return;
    }

    const emaillRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );

    if (!emaillRegex.test(email)) {
      style.Toast.fire({
        html: `
          <div style="display:flex; align-items:center">
          <strong style="margin-right: 95px; font-size:16px">請輸入完整Email</strong>
          <img style="width: 40px" src="/Twitter/error.svg">
          </div>`,
      });
      return;
    }

    try {
      const resData = await editUser({
        id,
        name,
        account,
        email,
        password,
        checkPassword,
      });
      console.log("Editing User Successful!", resData);
      handleUpdatedUserData(id);
      style.Toast.fire({
        html: `
          <div style="display:flex; align-items:center">
          <strong style="margin-right: 160px; font-size:16px">編輯成功</strong>
          <img style="width: 40px" src="/Twitter/success.svg">
          </div>`,
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Container>
        <SettingTittleContainer>
          <SettingTittle>帳戶設定</SettingTittle>
        </SettingTittleContainer>

        {userData && (
          <SettingInputMainWrapper>
            <SettingInputContainer>
              <AuthInput
                label={"帳號"}
                maxLength={30}
                minLength={1}
                name={account}
                value={userData.account}
                placeholder={"請輸入帳號"}
                onChange={(accountInputValue) => setAccount(accountInputValue)}
                error={accountError}
                onClick={() => handleInputClick(setAccountError)}
              />
            </SettingInputContainer>

            <SettingInputContainer>
              <AuthInput
                label={"名稱"}
                maxLength={50}
                minLength={1}
                name={name}
                value={userData.name}
                placeholder={"請輸入使用者名稱"}
                onChange={(nameInputValue) => setName(nameInputValue)}
                error={nameError}
                onClick={() => handleInputClick(setNameError)}
              />
            </SettingInputContainer>

            <SettingInputContainer>
              <AuthInput
                type={"email"}
                label={"Email"}
                maxLength={30}
                minLength={1}
                name={email}
                value={userData.email}
                placeholder={"請輸入Email"}
                onChange={(emailInputValue) => setEmail(emailInputValue)}
                error={emailError}
                onClick={() => handleInputClick(setEmailError)}
              />
            </SettingInputContainer>

            <SettingInputContainer>
              <AuthInput
                label={"密碼"}
                type={"password"}
                maxLength={20}
                minLength={5}
                name={password}
                value={password}
                placeholder={"請設定密碼"}
                onChange={(passwordInputValue) =>
                  setPassword(passwordInputValue)
                }
                error={passwordError}
                onClick={() => handleInputClick(setPasswordError)}
                required
              />
            </SettingInputContainer>

            <SettingInputContainer>
              <AuthInput
                label={"密碼再確認"}
                type={"password"}
                maxLength={20}
                minLength={5}
                name={checkPassword}
                value={checkPassword}
                placeholder={"請再次輸入密碼"}
                onChange={(checkPasswordInputValue) =>
                  setCheckPassword(checkPasswordInputValue)
                }
                error={checkPasswordError}
                onClick={() => handleInputClick(setCheckPasswordError)}
                required
              />
            </SettingInputContainer>

            <SettingButtonWrapper>
              <SettingButton onClick={handleClick}>儲存</SettingButton>
            </SettingButtonWrapper>
          </SettingInputMainWrapper>
        )}
      </Container>
    </>
  );
};

export default SettingPage;
