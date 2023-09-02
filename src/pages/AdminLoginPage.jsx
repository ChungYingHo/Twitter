// package
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// component and style
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
import { Toast } from "../components/common/common.styled";
// api and function
import { adminLogin } from "../api/admin";
import { useAdminLoginAuthValitate } from "../utils/authValidate";
import { useErrorContext } from "../context/ErrorContext";


// component
const AdminLoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  // 驗證 token
  useAdminLoginAuthValitate("/admin_tweets");

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

  const handleClick = async () => {
    if (account.length === 0 || password.length === 0) {
      Toast.fire({
        title: "請輸入完整帳號密碼",
        icon: "error",
      });
      return;
    }
    try {
      const { success, adminToken } = await adminLogin({
        account,
        password,
      });
      if (success) {
        localStorage.setItem("AdminToken", adminToken);
        Toast.fire({
          title: "登入成功",
          icon: "success",
        });
        navigate("/admin_tweets");
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
      <AuthTittle>後台登入</AuthTittle>
      <AuthInputContainer>
        <AuthInput
          label={"帳號"}
          labelfor={"account"}
          inputid={"account"}
          value={account}
          placeholder={"請輸入帳號"}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
          error={accountError}
          onClick={() => handleInputClick(setAccountError)}
          maxLength={30}
          minLength={1}
          required={true}
        />
      </AuthInputContainer>
      <AuthInputContainer>
        <AuthInput
          label={"密碼"}
          labelfor={"password"}
          inputid={"password"}
          type={"password"}
          value={password}
          placeholder={"請輸入密碼"}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          error={passwordError}
          onClick={() => handleInputClick(setPasswordError)}
          maxLength={20}
          minLength={5}
          required={true}
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
