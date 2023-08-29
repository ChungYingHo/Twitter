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
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// api
import { adminLogin } from "../api/admin";
import { checkAdminPermission } from "../api/Permission";

const AdminLoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  // 驗證 token
  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('AdminToken');
      if (!authToken) {
        return;
      }
      const result = await checkAdminPermission(authToken);
      if (result) {
        navigate('/admin_tweets');
      }
    };

    checkTokenIsValid();
  }, [navigate])

  // error control
  const [accountError, setAccountError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const handleInputClick = (errorState) => {
    errorState('');
  }
  
  const handleClick = async () => {
    if (account.length === 0 || password.length === 0) {
      Swal.fire("請輸入完整帳號密碼");
      return;
    }
    try{
      const { success, adminToken } = await adminLogin({
        account,
        password,
      });
      if (success) {
        localStorage.setItem("AdminToken", adminToken);
        navigate("/admin_tweets");
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
      <AuthTittle>後台登入</AuthTittle>
      <AuthInputContainer>
        <AuthInput
          label={"帳號"}
          value={account}
          placeholder={"請輸入帳號"}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
          error={accountError}
          onClick={() => handleInputClick(setAccountError)}
          maxLength={30}
          minLength={1}
        />
      </AuthInputContainer>
      <AuthInputContainer>
        <AuthInput
          label={"密碼"}
          value={password}
          placeholder={"請輸入密碼"}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          error={passwordError}
          onClick={() => handleInputClick(setPasswordError)}
          maxLength={20}
          minLength={5}
        />
      </AuthInputContainer>
      {error && <div>{error}</div>}
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
