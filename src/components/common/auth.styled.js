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
  height: 54px;
  margin-bottom: 24px;
  border-bottom: 2px solid rgb(101, 119, 134);
  &:hover,
  &:active {
    border-bottom: 2px solid #50b5ff;
  }

  &.redLine {
    border-bottom: 2px solid #fc5a5a;
  }
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
  margin: 1rem 0;
  cursor: pointer;
  &:active{
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) inset
  }
`;

const StyledLinkText = styled.div`
  color: #0062ff;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const StyledLinkWrapper = styled.div`
  width: 356px;
  display: flex;
  justify-content: flex-end;
  margin: rem 0;
`;

const StyledTittle = styled.h3`
  margin: 24px 0 30px 0;
  font-weight: 700;
`;

const StyledSpan = styled.span`
  margin: 0 10px;
`;

const InputLength = styled.div`
  height: 20px;
  color: #696974;
  font-size: 12px;
  font-weight: 500;
  padding-top: 4px;

  display: flex;
  justify-content: space-between;
`;

const WarnMsg = styled.div`
  visibility: hidden;
  &.warn {
    color: #fc5a5a;
    visibility: visible;
  }
`;

export {
  StyedContainer as AuthContainer,
  StyledAuthInputContainer as AuthInputContainer,
  StyledButton as AuthButton,
  StyledLinkText as AuthLinkText,
  StyledLinkWrapper as AuthLinkWrapper,
  StyledTittle as AuthTittle,
  StyledSpan as AuthSpan,
  InputLength,
  WarnMsg,
};
