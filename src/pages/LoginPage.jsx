// package
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// component and style
import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
  AuthLinkWrapper,
  AuthTittle,
  AuthSpan
} from "../components/common/auth.styled";
import { ReactComponent as Logo } from "../assets/logo.svg";
import AuthInput from "../components/AuthInput";
import { Toast } from "../components/common/common.styled";
// api and function
import { login } from "../api/auth";
import { getUser } from "../api/user";
import { UserContext } from "../context/UserContext";
import { useAuthValitate } from "../utils/authValidate";



const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  // 驗證 token
  useAuthValitate('/main')

  // error control
  const [accountError, setAccountError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const handleInputClick = (errorState) => {
    errorState('');
  }

  // login action
  const handleClick = async () => {
    if (account.trim().length === 0 || password.trim().length === 0) {
      Toast.fire({
        title: '請輸入完整帳號密碼',
        icon: 'error'
      })
      return;
    }
    try{
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

            const userData = await getUser();
            setUserData(userData);
            console.log("Login Successful!");
            Toast.fire({
              title: '登入成功',
              icon: 'success'
            })
            navigate("/main");
      }
    } catch (error){
      if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          if (errorMessage.includes("帳號")) {
            setAccountError(errorMessage);
          }else if (errorMessage.includes("密碼")) {
            setPasswordError(errorMessage);
          }
          console.error('[Login error:', errorMessage);
        } else {
          console.error('An error occurred:', error);
        }
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
          maxLength={30}
          minLength={1}
          value={account}
          placeholder={"請輸入帳號"}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
          error={accountError}
          onClick={() => handleInputClick(setAccountError)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={"密碼"}
          type={'password'}
          maxLength={20}
          minLength={5}
          value={password}
          placeholder={"請輸入密碼"}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          error={passwordError}
          onClick={() => handleInputClick(setPasswordError)}
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
