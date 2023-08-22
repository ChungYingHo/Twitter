import styled from "styled-components";

const StyedContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const StyledAuthInputContainer = styled.div`
  width: 356px;
  height: 78px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  border-radius: 30px;
  background-color: #ff6600;
  border: none;

  color: white;
  width: 356px;
  font-family: "Noto Sans TC", sans-serif;
  font-weight: bold;
  padding: 6px 0;
  margin: 2rem 0 1rem 0;

  &.hover {
    cursor: pointer;
  }
`;

const StyledLinkText = styled.div`
  color: #0062ff;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
`;

const StyledLinkWrapper = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-around;
  margin-left: 200px;
  padding-bottom: 20px;
`;

const StyledTittle = styled.h3`
  margin: 24px 0 20px 0;
  font-weight: 700;
`;
export {
  StyedContainer as AuthContainer,
  StyledAuthInputContainer as AuthInputContainer,
  StyledButton as AuthButton,
  StyledLinkText as AuthLinkText,
  StyledLinkWrapper as AuthLinkWrapper,
  StyledTittle as AuthTittle,
};
