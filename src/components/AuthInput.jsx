import styled from "styled-components";

const StyledContainer = styled.div`
  outline: red solid 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #f5f8fa;
  width: 100%;
  height: 100%;
  border-radius: 2px;
`;
const StyledLabel = styled.label`
  font-size: 14;
  color: "#696974";
  text-align: start;
  margin: 0 0 0 17px;
`;

const StyledInput = styled.input`
  outline: none;
  border: none;
  background-color: #f5f8fa;
  border-radius: 0px;
`;

const StyledTextarea = styled.textarea`
  outline: none;
  border: none;
  background-color: #f5f8fa;
  border-radius: 0px;
  resize: none;
  line-height: 26px;
  font-size: 16px;
`;

const AuthInput = ({ label, type, placeholder, value, onChange, isLarge, maxLength, minLength }) => {
  return (
    <StyledContainer>
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
        />
      )}
    </StyledContainer>
  );
};

export default AuthInput;
