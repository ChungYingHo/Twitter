import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
  AuthTittle,
} from "../components/common/auth.styled";
import { ReactComponent as Logo } from "../assets/logo.svg";
import AuthInput from "../components/AuthInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../api/auth";

const RegisterPage = () => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (
      account.length === 0 ||
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      checkPassword.length === 0
    ) {
      alert("請輸入完整註冊清單");
      return;
    }

    const { success, userToken, errorMessage } = await register({
      name,
      account,
      email,
      password,
      checkPassword,
    });
    if (success) {
      localStorage.setItem("UserToken", userToken);
    } else {
      setError(errorMessage);
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
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={"名稱"}
          name={name}
          value={name}
          placeholder={"請輸入使用者名稱"}
          onChange={(nameInputValue) => setName(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={"Email"}
          name={email}
          value={email}
          placeholder={"請輸入Email"}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={"密碼"}
          name={password}
          value={password}
          placeholder={"請輸入密碼"}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={"密碼"}
          name={checkPassword}
          value={checkPassword}
          placeholder={"請再次輸入密碼"}
          onChange={(checkPasswordInputValue) =>
            setCheckPassword(checkPasswordInputValue)
          }
        />
      </AuthInputContainer>
      {error && <div>{error}</div>}
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default RegisterPage;
