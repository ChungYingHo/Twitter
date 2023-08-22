import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
  AuthTittle,
} from "../components/common/auth.styled";
import { ReactComponent as Logo } from "../assets/logo.svg";
import AuthInput from "../components/AuthInput";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    if (username.length === 0) {
      return;
    }
    if (email.length === 0) {
      return;
    }

    if (password.length === 0) {
      return;
    }
  };

  return (
    <AuthContainer>
      <Logo />
      <AuthTittle>建立您的帳號</AuthTittle>

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
          label={"Email"}
          value={email}
          placeholder={"請輸入Email"}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
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
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default RegisterPage;
