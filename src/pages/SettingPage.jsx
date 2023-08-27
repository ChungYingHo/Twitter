import AuthInput from "../components/AuthInput";
import {
  SettingInputContainer,
  SettingTittleContainer,
  SettingTittle,
  SettingButtonWrapper,
  SettingButton,
  SettingHr,
} from "../components/common/setting.styled";
import { useState, useEffect } from "react";
import styled from "styled-components";
import * as style from "../components/common/common.styled";
// api
import { getUser } from "../api/setting";

const Container = styled.div`
    outline: green solid 2px;
    padding: 0;
    width: 56.2%;
    border: ${style.styledBorder};
    position: relative;
  `;

const SettingPage = () => {
  const [user, setUser] = useState([])
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const handleClick = () => {
    if (
      account.length === 0 ||
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      checkPassword.length === 0
    ) {
      return;
    }
  };

  useEffect(() => {
        const fetchingUser = async ()=>{
            try{
                const userData = await getUser()
                setUser(userData)
                console.log('User data:', userData)
            } catch (error){
                console.error('Get User Failed:', error)
            }
        }
        fetchingUser()
    }, [])

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
            maxlength="30"
            name={account}
            value={account}
            placeholder={"請輸入帳號"}
            onChange={(accountInputValue) => setAccount(accountInputValue)}
          />
        </SettingInputContainer>

        <SettingInputContainer>
          <AuthInput
            label={"名稱"}
            maxlength="50"
            name={name}
            value={name}
            placeholder={"請輸入使用者名稱"}
            onChange={(nameInputValue) => setName(nameInputValue)}
          />
        </SettingInputContainer>

        <SettingInputContainer>
          <AuthInput
            type="email"
            label={"Email"}
            name={email}
            value={email}
            placeholder={"請輸入Email"}
            onChange={(emailInputValue) => setEmail(emailInputValue)}
          />
        </SettingInputContainer>

        <SettingInputContainer>
          <AuthInput
            label={"密碼"}
            minlength="5"
            maxlength="20"
            name={password}
            value={password}
            placeholder={"請輸入密碼"}
            onChange={(passwordInputValue) => setPassword(passwordInputValue)}
            required
          />
        </SettingInputContainer>

        <SettingInputContainer>
          <AuthInput
            label={"密碼再確認"}
            minlength="5"
            maxlength="20"
            name={checkPassword}
            value={checkPassword}
            placeholder={"請輸入密碼"}
            onChange={(checkPasswordInputValue) =>
              setCheckPassword(checkPasswordInputValue)
            }
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
