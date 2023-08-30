// package
import styled from "styled-components";
import { useState, useEffect } from "react";
// component and style
import AuthInput from "../components/AuthInput";
import {
  SettingInputContainer,
  SettingTittleContainer,
  SettingTittle,
  SettingButtonWrapper,
  SettingButton,
  SettingHr,
} from "../components/common/setting.styled";
import * as style from "../components/common/common.styled"
// api
import { getUser, editUser } from "../api/setting";
import { useAuthValitate } from "../utils/authValidate";

const Container = styled.div`
  padding: 0;
  width: 56.2%;
  border: ${style.styledBorder};
  position: relative;
`;

const SettingPage = () => {
    const [user, setUser] = useState({});
    const [account, setAccount] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    // 驗證 token
    useAuthValitate('/login')

    // 錯誤提示控管
    const [accountError, setAccountError] = useState("")
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [checkPasswordError, setCheckPasswordError] = useState("")
    const handleInputClick = (errorState) => {
      errorState('');
    }
    
    // 抓取用戶資料
    useEffect(() => {
      const fetchingUser = async () => {
        try {
          const userData = await getUser();
          setUser(userData);
          setAccount(userData.account);
          setName(userData.name);
          setEmail(userData.email);
        } catch (error) {
          console.error("Get User Failed:", error);
        }
      };
      fetchingUser();
    }, []);

    const handleClick = async () => {
      if (
        account.trim().length === 0 ||
        name.trim().length === 0 ||
        email.trim().length === 0
      ) {
        console.log(`warning`)
        style.Toast.fire({
          title: '請輸入完整資訊',
          icon: 'error'
        })
        return;
      }

      try {
        const resData = await editUser({ name, account, email, password, checkPassword });
        console.log("Editing User Successful!", resData);
        style.Toast.fire({
          title: '編輯成功！',
          icon: 'success'
        })
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          if (errorMessage.includes("account")) {
            setAccountError(errorMessage);
          } else if (errorMessage.includes("暱稱")) {
            setNameError(errorMessage);
          } else if (errorMessage.includes("email")) {
            setEmailError(errorMessage);
          } else if (errorMessage.includes("密碼")) {
            setPasswordError(errorMessage);
          } else if (errorMessage.includes("確認密碼")) {
            setCheckPasswordError(errorMessage);
          }
          console.error('[Edit error:', errorMessage);
        } else {
          console.error('An error occurred:', error);
        }
      }
    };

  return (
    <>
      <Container>
        <SettingTittleContainer>
          <SettingTittle>帳戶設定</SettingTittle>
        </SettingTittleContainer>

        <SettingHr />

        <SettingInputContainer>
          <AuthInput
            label={"帳號"}
            maxLength={30}
            minLength={1}
            name={account}
            value={user.account}
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
            value={user.name}
            placeholder={"請輸入使用者名稱"}
            onChange={(nameInputValue) => setName(nameInputValue)}
            error={nameError}
            onClick={() => handleInputClick(setNameError)}
          />
        </SettingInputContainer>

        <SettingInputContainer>
          <AuthInput
            type={'email'}
            label={"Email"}
            maxLength={30}
            minLength={1}
            name={email}
            value={user.email}
            placeholder={"請輸入Email"}
            onChange={(emailInputValue) => setEmail(emailInputValue)}
            error={emailError}
            onClick={() => handleInputClick(setEmailError)}
          />
        </SettingInputContainer>

        <SettingInputContainer>
          <AuthInput
            label={"密碼"}
            type={'password'}
            maxLength={20}
            minLength={5}
            name={password}
            value={user.password}
            placeholder={"請設定密碼"}
            onChange={(passwordInputValue) => setPassword(passwordInputValue)}
            error={passwordError}
            onClick={() => handleInputClick(setPasswordError)}
            required
          />
        </SettingInputContainer>

        <SettingInputContainer>
          <AuthInput
            label={"密碼再確認"}
            type={'password'}
            maxLength={20}
            minLength={5}
            name={checkPassword}
            value={checkPassword}
            placeholder={"請再次輸入密碼"}
            onChange={(checkPasswordInputValue) =>
              setCheckPassword(checkPasswordInputValue)
            }
            error={passwordError}
            onClick={() => handleInputClick(setCheckPasswordError)}
            required
          />
        </SettingInputContainer>

        <SettingButtonWrapper>
          <SettingButton onClick={handleClick}>儲存</SettingButton>
        </SettingButtonWrapper>
      </Container>
    </>
  );
};

export default SettingPage;
