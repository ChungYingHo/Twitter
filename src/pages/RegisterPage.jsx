import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
  AuthTittle,
  InputLength,
  WarnMsg,
} from "../components/common/auth.styled";
import { ReactComponent as Logo } from "../assets/logo.svg";
import AuthInput from "../components/AuthInput";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// api
import { checkPermission } from "../api/Permission";
import { register } from "../api/auth";
import Swal from "sweetalert2";
import clsx from "clsx";

const RegisterPage = () => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // error control
  const [accountError, setAccountError] = useState("")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [checkPasswordError, setCheckPasswordError] = useState("")
  const handleInputClick = (errorState) => {
    errorState('');
  }

  const handleClick = async () => {
    if (
      account.length === 0 ||
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      checkPassword.length === 0
    ) {
      Swal.fire("註冊欄未填寫完整");
      return;
    }
    try{
      const { success } = await register({
          name,
          account,
          email,
          password,
          checkPassword,
        });
        if (success) {
          Swal.fire("註冊成功，請重新登入");
          navigate("/login");
      }
    } catch (error){
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          if (errorMessage.includes("account")) {
            setAccountError(errorMessage);
          } else if (errorMessage.includes("暱稱")) {
            setNameError(errorMessage);
          } else if (errorMessage.includes("email")) {
            setEmailError(errorMessage);
          } else if (errorMessage.includes("密碼")) {
            setPasswordError(errorMessage);
          } else if (errorMessage.includes("確認密碼")) {
            setCheckPasswordError(errorMessage);
          }
          console.error('[Edit error:', errorMessage);
        } else {
          console.error('An error occurred:', error);
        }
    }
  };

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('UserToken');
      if (!authToken) {
        return;
      }
      const result = await checkPermission(authToken);
      if (result) {
        navigate('/main');
      }
    };

    checkTokenIsValid();
  }, [navigate])

  return (
    <AuthContainer>
      <Logo />
      <AuthTittle>建立您的帳號</AuthTittle>

      <AuthInputContainer>
        <AuthInput
          label={"帳號"}
          name={account}
          value={account}
          placeholder={"請輸入帳號"}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
          maxLength={30}
          minLength={1}
          error={accountError}
          onClick={() => handleInputClick(setAccountError)}
          required
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={"名稱"}
          name={name}
          value={name}
          placeholder={"請輸入使用者名稱"}
          onChange={(nameInputValue) => setName(nameInputValue)}
          maxLength={50}
          minLength={1}
          error={nameError}
          onClick={() => handleInputClick(setNameError)}
          required
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type={'email'}
          label={"Email"}
          name={email}
          value={email}
          placeholder={"請輸入Email"}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
          maxLength={30}
          minLength={1}
          error={emailError}
          onClick={() => handleInputClick(setEmailError)}
          required
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={"密碼"}
          type={'password'}
          maxLength={20}
          minLength={5}
          name={password}
          value={password}
          placeholder={"請設定密碼"}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          error={passwordError}
          onClick={() => handleInputClick(setPasswordError)}
          required
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={"密碼確認"}
          type={'password'}
          maxLength={20}
          minLength={5}
          name={checkPassword}
          value={checkPassword}
          placeholder={"請再次輸入密碼"}
          onChange={(checkPasswordInputValue) =>
            setCheckPassword(checkPasswordInputValue)
          }
          error={passwordError}
          onClick={() => handleInputClick(setCheckPasswordError)}
          required
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
