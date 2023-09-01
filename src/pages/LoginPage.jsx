// package
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// component and style
import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
  AuthLinkWrapper,
  AuthTittle,
  AuthSpan,
} from "../components/common/auth.styled";
import { ReactComponent as Logo } from "../assets/logo.svg";
import AuthInput from "../components/AuthInput";
import { Toast } from "../components/common/common.styled";
// api and function
import { login } from "../api/auth";
import { getUser } from "../api/user";
import { UserContext } from "../context/UserContext";
import { useLoginAuthValitate } from "../utils/authValidate";
import { useErrorContext } from "../context/ErrorContext";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  // 驗證 token
  useLoginAuthValitate("/main");

  // error control
  const {
    accountError,
    setAccountError,
    passwordError,
    setPasswordError,
    handleInputClick,
    handleError,
    useResetErrorsEffect,
  } = useErrorContext();
  useResetErrorsEffect();

  // login action
  const handleClick = async () => {
    if (account.trim().length === 0 || password.trim().length === 0) {
      Toast.fire({
        title: "請輸入完整帳號密碼",
        icon: "error",
      });
      return;
    }
    try {
      const {
        success,
        userToken,
        userData: userDataFromLogin,
      } = await login({
        account,
        password,
      });
      if (success) {
        localStorage.setItem("UserToken", userToken);
        localStorage.setItem("userID", userDataFromLogin.id);
        const id = localStorage.getItem("userID");

        const userData = await getUser(id);
        setUserData(userData);
        console.log("Login Successful!");
        Toast.fire({
          title: "登入成功",
          icon: "success",
        });
        navigate("/main");
      }
    } catch (error) {
      handleError(error);
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
          labelfor={"account"}
          inputid={"account"}
          maxLength={30}
          minLength={1}
          value={account}
          placeholder={"請輸入帳號"}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
          error={accountError}
          onClick={() => handleInputClick(setAccountError)}
          required={true}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={"密碼"}
          labelfor={"password"}
          inputid={"password"}
          type={"password"}
          maxLength={20}
          minLength={5}
          value={password}
          placeholder={"請輸入密碼"}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          error={passwordError}
          onClick={() => handleInputClick(setPasswordError)}
          required={true}
        />
      </AuthInputContainer>
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
