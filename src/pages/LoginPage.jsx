import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
  AuthLinkWrapper,
  AuthTittle,
  AuthSpan,
  InputLength,
  WarnMsg,
} from "../components/common/auth.styled";
import { ReactComponent as Logo } from "../assets/logo.svg";
import AuthInput from "../components/AuthInput";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// api
import { checkPermission } from "../api/Permission";
import { login } from "../api/auth";
import { getUser } from "../api/user";
import Swal from "sweetalert2";
import clsx from "clsx";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(UserContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClick = async () => {
    if (account.length === 0 || password.length === 0) {
      Swal.fire("請輸入完整帳號密碼");
      return;
    }

    const {
      success,
      userToken,
      errorMessage,
      userData: userDataFromLogin,
    } = await login({
      account,
      password,
    });
    if (success) {
      localStorage.setItem("UserToken", userToken);
      localStorage.setItem("userID", userDataFromLogin.id);

      const userData = await getUser();
      setUserData(userData);
      navigate("/main");
    } else {
      setError(errorMessage);
    }
  };

  // console.log("get userData in login", userData);

  // 驗證 token
  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem("UserToken");
      if (!authToken) {
        return;
      }
      const result = await checkPermission(authToken);
      if (result) {
        navigate("/main");
      }
    };

    checkTokenIsValid();
  }, [navigate]);

  return (
    <AuthContainer>
      <div>
        <Logo />
      </div>
      <AuthTittle>登入Alphitter</AuthTittle>
      <AuthInputContainer
        className={clsx("", { redLine: account.length > 30 })}
      >
        <AuthInput
          label={"帳號"}
          maxlength="30"
          value={account}
          placeholder={"請輸入帳號"}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
        <InputLength>
          <WarnMsg className={clsx("", { warn: account.length > 30 })}>
            字數超過上限!!
          </WarnMsg>
          <div>{account.length}/30</div>
        </InputLength>
      </AuthInputContainer>

      <AuthInputContainer
        className={clsx("", { redLine: password.length > 20 })}
      >
        <AuthInput
          label={"密碼"}
          maxlength="20"
          value={password}
          placeholder={"請輸入密碼"}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
        <InputLength>
          <WarnMsg className={clsx("", { warn: password.length > 20 })}>
            字數超過上限!!
          </WarnMsg>
          <div>{password.length}/20</div>
        </InputLength>
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
