import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
  AuthLinkWrapper,
  AuthTittle,
} from "../components/common/auth.styled";
import { ReactComponent as Logo } from "../assets/logo.svg";
import AuthInput from "../components/AuthInput";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    if (username.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
  };

  return (
    <AuthContainer>
      <div>
        <Logo />
      </div>
      <AuthTittle>登入Alphitter</AuthTittle>
      <AuthInputContainer>
        <AuthInput
          label={"帳號"}
          value={username}
          placeholder={"請輸入帳號"}
          onChange={(nameInputValue) => setUserName(nameInputValue)}
        />
      </AuthInputContainer>
      <AuthInputContainer>
        <AuthInput
          label={"密碼"}
          value={password}
          placeholder={"請輸入密碼"}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <AuthLinkWrapper>
        <Link to="/register">
          <AuthLinkText>註冊</AuthLinkText>
        </Link>
        <span>・</span>
        <Link to="/admin_login">
          <AuthLinkText>後台登入</AuthLinkText>
        </Link>
      </AuthLinkWrapper>
    </AuthContainer>
  );
};

export default LoginPage;
