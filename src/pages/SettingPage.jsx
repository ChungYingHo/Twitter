import AuthInput from "../components/AuthInput";
import {
  SettingContainer,
  SettingInputContainer,
  SettingTittleContainer,
  SettingTittle,
  SettingButtonWrapper,
  SettingButton,
  SettingHr,
} from "../components/common/setting.styled";
import ToolBar from "../components/Toolbar";
import { useState } from "react";
// import { Link } from "react-router-dom";

const SettingPage = () => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const handleClick = () => {
    if (account.length === 0) {
      return;
    }

    if (name.length === 0) {
      return;
    }

    if (email.length === 0) {
      return;
    }

    if (password.length === 0) {
      return;
    }

    if (checkPassword.length === 0) {
      return;
    }
  };

  return (
    <>
      <ToolBar />
      <SettingContainer>
        <SettingTittleContainer>
          <SettingTittle>帳戶設定</SettingTittle>
        </SettingTittleContainer>

        <SettingHr />

        <SettingInputContainer>
          <AuthInput
            label={"帳號"}
            name={account}
            value={account}
            placeholder={"請輸入帳號"}
            onChange={(accountInputValue) => setAccount(accountInputValue)}
          />
        </SettingInputContainer>

        <SettingInputContainer>
          <AuthInput
            label={"名稱"}
            name={name}
            value={name}
            placeholder={"請輸入使用者名稱"}
            onChange={(nameInputValue) => setName(nameInputValue)}
          />
        </SettingInputContainer>

        <SettingInputContainer>
          <AuthInput
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
            name={password}
            value={password}
            placeholder={"請輸入密碼"}
            onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          />
        </SettingInputContainer>

        <SettingInputContainer>
          <AuthInput
            label={"密碼再確認"}
            name={checkPassword}
            value={checkPassword}
            placeholder={"請輸入密碼"}
            onChange={(checkPasswordInputValue) =>
              setCheckPassword(checkPasswordInputValue)
            }
          />
        </SettingInputContainer>

        <SettingButtonWrapper>
          <SettingButton onClick={handleClick}>儲存</SettingButton>
        </SettingButtonWrapper>
      </SettingContainer>
    </>
  );
};

export default SettingPage;
