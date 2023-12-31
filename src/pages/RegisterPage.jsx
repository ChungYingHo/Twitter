// package
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// component and style
import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
  AuthTittle,
} from "../components/common/auth.styled";
import { ReactComponent as Logo } from "../assets/logo.svg";
import AuthInput from "../components/AuthInput";
import { Toast } from "../components/common/common.styled";
// api and function
import { register } from "../api/auth";
import { useLoginAuthValitate } from "../utils/authValidate";
import { useErrorContext } from "../context/ErrorContext";

// component
const RegisterPage = () => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();
  // token validate
  useLoginAuthValitate("/main");

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
    useResetErrorsEffect,
  } = useErrorContext();
  useResetErrorsEffect();

  // edit summit
  const handleClick = async () => {
    if (
      account.length === 0 ||
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      checkPassword.length === 0
    ) {
      Toast.fire({
        html: `
          <div style="display:flex; align-items:center">
          <strong style="margin-right: 110px; font-size:16px">請填寫完整資訊</strong>
          <img style="width: 40px" src="/Twitter/error.svg">
          </div>`,
      });
      return;
    }

    const emaillRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
    if (!emaillRegex.test(email)) {
      Toast.fire({
        html: `
          <div style="display:flex; align-items:center">
          <strong style="margin-right: 95px; font-size:16px">請輸入完整Email</strong>
          <img style="width: 40px" src="/Twitter/error.svg">
          </div>`,
      });
      return;
    }
    
    try {
      const { success } = await register({
        name,
        account,
        email,
        password,
        checkPassword,
      });
      if (success) {
        Toast.fire({
          html: `
          <div style="display:flex; align-items:center">
          <strong style="margin-right: 65px; font-size:16px">註冊成功，請重新登入</strong>
          <img style="width: 40px" src="/Twitter/success.svg">
          </div>`,
        });
        navigate("/login");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AuthContainer>
      <Logo />
      <AuthTittle>建立您的帳號</AuthTittle>

      <AuthInputContainer>
        <AuthInput
          label={"帳號"}
          labelfor={"account"}
          inputid={"account"}
          name={account}
          value={account}
          placeholder={"請輸入帳號"}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
          maxLength={30}
          minLength={1}
          error={accountError}
          onClick={() => handleInputClick(setAccountError)}
          required={true}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={"名稱"}
          labelfor={"name"}
          inputid={"name"}
          name={name}
          value={name}
          placeholder={"請輸入使用者名稱"}
          onChange={(nameInputValue) => setName(nameInputValue)}
          maxLength={50}
          minLength={1}
          error={nameError}
          onClick={() => handleInputClick(setNameError)}
          required={true}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type={"email"}
          label={"Email"}
          labelfor={"email"}
          inputid={"email"}
          name={email}
          value={email}
          placeholder={"請輸入Email"}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
          maxLength={30}
          minLength={1}
          error={emailError}
          onClick={() => handleInputClick(setEmailError)}
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
          name={password}
          value={password}
          placeholder={"請設定密碼"}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          error={passwordError}
          onClick={() => handleInputClick(setPasswordError)}
          required={true}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={"密碼確認"}
          labelfor={"checkPassword"}
          inputid={"checkPassword"}
          type={"password"}
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
          required={true}
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
