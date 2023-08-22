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

const AdminLoginPage = () => {
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
      <AuthTittle>後台登入</AuthTittle>
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
        <Link to="/login">
          <AuthLinkText>前台登入</AuthLinkText>
        </Link>
      </AuthLinkWrapper>
    </AuthContainer>
  );
};

export default AdminLoginPage;
