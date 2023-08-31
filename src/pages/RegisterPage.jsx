// package
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// component and style
import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
  AuthTittle
} from "../components/common/auth.styled";
import { ReactComponent as Logo } from "../assets/logo.svg";
import AuthInput from "../components/AuthInput";
import { Toast } from "../components/common/common.styled";
// api and function
import { register } from "../api/auth";
import { useLoginAuthValitate } from "../utils/authValidate";
import { useErrorContext } from "../context/ErrorContext";

const RegisterPage = () => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();
  // token validate
  useLoginAuthValitate('/main')

  // error control
  const {
      accountError,
      setAccountError,
      nameError,
      setNameError,
      emailError,
      setEmailError,
      passwordError,
      setPasswordError,
      checkPasswordError,
      setCheckPasswordError,
      handleInputClick,
      handleError,
      useResetErrorsEffect
    } = useErrorContext();
  useResetErrorsEffect()

  const handleClick = async () => {
    if (
      account.length === 0 ||
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      checkPassword.length === 0
    ) {
      Toast.fire({
        title: '請填寫完整資訊',
        icon: 'error'
      })
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
          Toast.fire({
            title: '註冊成功，請重新登入',
            icon: 'success'
          })
          navigate("/login");
      }
    } catch (error){
        handleError(error)
    }
  };

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
          error={checkPasswordError}
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
