import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #f5f8fa;
  width: 100%;
  height: 100%;
  border-bottom: 2px solid rgb(101, 119, 134);
  &:active,
  &:hover {
    border-bottom: 2px solid #50b5ff;
  }
`;
const StyledLabel = styled.label`
  font-size: 14;
  color: "#696974";
  text-align: start;
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
  columns: 5;
`;

const AuthInput = ({ label, type, placeholder, value, onChange, isLarge }) => {
  return (
    <StyledContainer>
      <StyledLabel>{label}</StyledLabel>
      {isLarge ? (
        <StyledTextarea
          placeholder={placeholder || ""}
          value={value || ""}
          onChange={(event) => onChange?.(event.target.value)}
          rows="4"
        />
      ) : (
        <StyledInput
          type={type || "text"}
          placeholder={placeholder || ""}
          value={value || ""}
          onChange={(event) => onChange?.(event.target.value)}
        />
      )}
    </StyledContainer>
  );
};

export default AuthInput;
