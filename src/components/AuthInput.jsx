import styled from "styled-components";
import { useState } from "react";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #f5f8fa;
  width: 100%;
  height: fit-content;
  min-height: 54px;
  border-radius: 2px;
  border-bottom: ${({ $error }) => ($error ? "#fc5a5a" : "#696974")} solid 2px;
  &:hover {
    border-bottom: #50b5ff solid 2px;
  }
`;
const StyledLabel = styled.label`
  width: 50%;
  font-size: 14;
  color: #696974;
  text-align: start;
  margin: 0 0 0 16px;
  font-family: "Noto Sans TC", "Montserrat";
`;

const StyledInput = styled.input`
  outline: none;
  width: calc(100% - 32px);
  margin: 0 0 0 16px;
  border: none;
  background-color: #f5f8fa;
  color: #171725;
  border-radius: 0px;
  font-family: "Noto Sans TC";
`;

const StyledTextarea = styled.textarea`
  width: calc(100% - 32px);
  margin: 0 0 0 16px;
  border: none;
  background-color: #f5f8fa;
  border-radius: 0px;
  resize: none;
  line-height: 26px;
  font-size: 16px;
  font-family: "Noto Sans TC";
  color: #171725;
  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #fc5a5a;
  display: inline-block;
  margin: 0;
`;

const InputValueWrapper = styled.div`
  width: 100%;
  margin-top: 4px;
  display: flex;
  justify-content: ${({ $haserror }) =>
    $haserror ? "space-between" : "flex-end"};
`;

const InputValueMsg = styled.p`
  color: #696974;
  font-size: 12px;
  font-weight: 500;
  font-family: "Noto Sans TC";
  margin: 0;
`;

// component
const AuthInput = ({
  inputid,
  label,
  labefor,
  type,
  placeholder,
  value,
  onChange,
  isLarge,
  maxLength,
  minLength,
  error,
  onClick,
  inputwarntext,
  required = false,
}) => {
  const hasError = error && error !== "";
  const [inputValue, setInputValue] = useState(value || "");

  const [setIsClicked] = useState(false);
  const handleClick = () => {
    // 若有使用AuthInput但沒有傳onClick這個prop,就不呼叫onClick()。避免出現error。setIsClicked這個prop也有同樣狀況。
    setIsClicked && setIsClicked(true);
    onClick && onClick();
  };

  const truncatedError = error?.substring(6);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <>
      <StyledContainer $error={hasError}>
        <StyledLabel for={labefor}>{label}</StyledLabel>
        {isLarge ? (
          <StyledTextarea
            id={inputid}
            type={type || "text"}
            placeholder={placeholder || ""}
            defaultValue={value || ""}
            onChange={(event) => handleInputChange(event.target.value)}
            rows="4"
            maxLength={maxLength}
            minLength={minLength}
            $inputwarntext={inputwarntext}
            required={required}
          />
        ) : (
          <StyledInput
            id={inputid}
            type={type || "text"}
            placeholder={placeholder || ""}
            defaultValue={value || ""}
            onChange={(event) => handleInputChange(event.target.value)}
            maxLength={maxLength}
            minLength={minLength}
            onClick={handleClick}
            $inputwarntext={inputwarntext}
            required={required}
          />
        )}
      </StyledContainer>
      <InputValueWrapper $haserror={!!error || inputValue.length >= maxLength}>
        {error && <ErrorMessage>{truncatedError}</ErrorMessage>}
        {inputValue.length >= maxLength && (
          <ErrorMessage>{inputwarntext}</ErrorMessage>
        )}
        <InputValueMsg>
          {inputValue.length}/{maxLength}
        </InputValueMsg>
      </InputValueWrapper>
    </>
  );
};

export default AuthInput;
