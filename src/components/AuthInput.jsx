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
  color: "#696974";
  text-align: start;
  margin: 0 0 0 16px;
`;

const StyledInput = styled.input`
  outline: none;
  width: calc(100% - 32px);
  margin: 0 0 0 16px;
  border: none;
  background-color: #f5f8fa;
  border-radius: 0px;
`;

const StyledTextarea = styled.textarea`
  outline: black solid 2px;
  width: calc(100% - 32px);
  margin: 0 0 0 16px;
  border: none;
  background-color: #f5f8fa;
  border-radius: 0px;
  resize: none;
  line-height: 26px;
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #fc5a5a;
  margin: 0 0 0 16px;
`;

const AuthInput = ({ label, type, placeholder, value, onChange, isLarge, maxLength, minLength, error, onClick}) => {
  const hasError = error && error !== ""
>>>>>>>>> Temporary merge branch 2

  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
    onClick();
  };
  return (
    <>
      <StyledContainer $error={hasError}>
        <StyledLabel>{label}</StyledLabel>
        {isLarge ? (
          <StyledTextarea
            placeholder={placeholder || ""}
            defaultValue={value || ""}
            onChange={(event) => onChange?.(event.target.value)}
            rows="4"
            maxLength={maxLength}
            minLength={minLength}
          />
        ) : (
          <StyledInput
            type={type || "text"}
            placeholder={placeholder || ""}
            defaultValue={value || ""}
            onChange={(event) => onChange?.(event.target.value)}
            maxLength={maxLength}
            minLength={minLength}
            onClick={handleClick}
          />
        )}
      </StyledContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

export default AuthInput;
