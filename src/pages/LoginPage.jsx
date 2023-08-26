import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
  AuthLinkWrapper,
  AuthTittle,
  AuthSpan,
  InputLength,
} from "../components/common/auth.styled";
import { ReactComponent as Logo } from "../assets/logo.svg";
import AuthInput from "../components/AuthInput";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClick = async () => {
    if (account.length === 0 || password.length === 0) {
      Swal.fire("請輸入完整帳號密碼");
      return;
    }

    const { success, userToken, errorMessage, userData } = await login({
      account,
      password,
    });
    if (success) {
      localStorage.setItem("UserToken", userToken);
      localStorage.setItem("userAccount", userData.account);
      localStorage.setItem("userAvatar", userData.avatar);
      localStorage.setItem("userBanner", userData.banner);
      localStorage.setItem("userIntro", userData.introduction);
      navigate("/main");
    } else {
      setError(errorMessage);
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
          maxlength="30"
          value={account}
          placeholder={"請輸入帳號"}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
        <InputLength>{account.length}/30</InputLength>
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={"密碼"}
          maxlength="20"
          value={password}
          placeholder={"請輸入密碼"}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
        <InputLength>{password.length}/20</InputLength>
      </AuthInputContainer>
      {error && <div>{error}</div>}
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <AuthLinkWrapper>
        <Link to="/register">
          <AuthLinkText>註冊</AuthLinkText>
        </Link>
        <AuthSpan>・</AuthSpan>
        <Link to="/admin_login">
          <AuthLinkText>後台登入</AuthLinkText>
        </Link>
      </AuthLinkWrapper>
    </AuthContainer>
  );
};

export default LoginPage;
