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
import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
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

    const { success, errorMessage } = await register({
      name,
      account,
      email,
      password,
      checkPassword,
    });
    if (success) {
      Swal.fire("註冊成功，請重新登入");
      navigate("/login");
    } else {
      setError(errorMessage);
    }
  };

  return (
    <AuthContainer>
      <Logo />
      <AuthTittle>建立您的帳號</AuthTittle>

      <AuthInputContainer
        className={clsx("", { redLine: account.length > 30 })}
      >
        <AuthInput
          maxlength="30"
          label={"帳號"}
          name={account}
          value={account}
          placeholder={"請輸入帳號"}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
          required
        />
        <InputLength>
          <WarnMsg className={clsx("", { warn: account.length > 30 })}>
            字數超過上限!!
          </WarnMsg>
          <div>{account.length}/30</div>
        </InputLength>
      </AuthInputContainer>

      <AuthInputContainer className={clsx("", { redLine: name.length > 50 })}>
        <AuthInput
          label={"名稱"}
          maxlength="50"
          name={name}
          value={name}
          placeholder={"請輸入使用者名稱"}
          onChange={(nameInputValue) => setName(nameInputValue)}
          required
        />
        <InputLength>
          <WarnMsg className={clsx("", { warn: name.length > 50 })}>
            字數超過上限!!
          </WarnMsg>
          <div>{name.length}/50</div>
        </InputLength>
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="email"
          label={"Email"}
          name={email}
          value={email}
          placeholder={"請輸入Email"}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
          required
        />
      </AuthInputContainer>

      <AuthInputContainer
        className={clsx("", { redLine: password.length > 20 })}
      >
        <AuthInput
          label={"密碼"}
          minlength="5"
          maxlength="20"
          name={password}
          value={password}
          placeholder={"請設定密碼"}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          required
        />
        <InputLength>
          <WarnMsg className={clsx("", { warn: password.length > 20 })}>
            字數超過上限!!
          </WarnMsg>
          <div>{password.length}/20</div>
        </InputLength>
      </AuthInputContainer>

      <AuthInputContainer
        className={clsx("", { redLine: checkPassword.length > 20 })}
      >
        <AuthInput
          label={"密碼確認"}
          minlength="5"
          maxlength="20"
          name={checkPassword}
          value={checkPassword}
          placeholder={"請再次輸入密碼"}
          onChange={(checkPasswordInputValue) =>
            setCheckPassword(checkPasswordInputValue)
          }
          required
        />
        <InputLength>
          <WarnMsg className={clsx("", { warn: checkPassword.length > 20 })}>
            字數超過上限!!
          </WarnMsg>
          <div>{checkPassword.length}/20</div>
        </InputLength>
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
