import styled from "styled-components";

const StyledSettingWrapper = styled.div`
  width: 641px;
  border: 1px solid #e6ecf0;
`;

const StyledSettingMainWrapper = styled.div`
  margin-top: 24px;
`;

const StyledSettingInputContainer = styled.div`
  width: auto;
  padding: 0 24px;
  margin-bottom: 8px;
  height: 78px;
`;

const StyledSettingTittleContainer = styled.div`
  margin-top: 24px;
  width: auto;
  height: 51px;
  padding: 0 24px;
  border-bottom: 1px solid #e6ecf0;
`;

const StyledSettingTittle = styled.h4`
  font-weight: 700;
  margin: 0;
`;

const StyledSettingButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
`;

const StyledSettingButton = styled.button`
  border-radius: 30px;
  background-color: #ff6600;
  border: none;
  color: white;
  width: 100px;
  font-family: "Noto Sans TC", sans-serif;
  font-weight: bold;
  font-size: 18px;
  padding: 6px 0;
  margin-top: 16px;

  &.hover {
    cursor: pointer;
  }
`;

export {
  StyledSettingWrapper as SettingContainer,
  StyledSettingInputContainer as SettingInputContainer,
  StyledSettingTittleContainer as SettingTittleContainer,
  StyledSettingTittle as SettingTittle,
  StyledSettingButton as SettingButton,
  StyledSettingButtonWrapper as SettingButtonWrapper,
  StyledSettingMainWrapper as SettingInputMainWrapper,
};
