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
// api and function
import { getUser, editUser } from "../api/setting";
import { useAuthValitate } from "../utils/authValidate";
import {useErrorContext} from '../context/ErrorContext'

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
    const id = localStorage.getItem('userID')
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
      useResetErrorsEffect
    } = useErrorContext();
    useResetErrorsEffect()
    // 驗證 token
    useAuthValitate('/login')
    // 抓取用戶資料
    useEffect(() => {
      const fetchingUser = async () => {
        try {
          const userData = await getUser({id});
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
        handleError(error)
      }
    };

  return (
    <>
      <Container>
        <SettingTittleContainer>
          <SettingTittle>帳戶設定</SettingTittle>
        </SettingTittleContainer>

        <SettingHr />
        {user && (
          <>
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
                error={checkPasswordError}
                onClick={() => handleInputClick(setCheckPasswordError)}
                required
              />
            </SettingInputContainer>

            <SettingButtonWrapper>
              <SettingButton onClick={handleClick}>儲存</SettingButton>
            </SettingButtonWrapper>
          </>
        )}
      </Container>
    </>
  );
};

export default SettingPage;
