import styled from "styled-components";

const StyledSettingWrapper = styled.div`
  width: 641px;
  border: 1px solid #e6ecf0;
`;

const StyledSettingInputContainer = styled.div`
  width: auto;
  margin-top: 30px;
  padding: 10px 20px;
`;

const StyledSettingTittleContainer = styled.div`
  margin-bottom: 20px;
  width: auto;
  height: 51px;
  padding: 20px;
`;

const StyledSettingTittle = styled.h4`
  font-weight: 700;
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
  margin: 1rem 0;

  &.hover {
    cursor: pointer;
  }
`;

const StyledSettingHr = styled.hr`
  width: 100%x;
  color: #e6ecf0;
`;

export {
  StyledSettingWrapper as SettingContainer,
  StyledSettingInputContainer as SettingInputContainer,
  StyledSettingTittleContainer as SettingTittleContainer,
  StyledSettingTittle as SettingTittle,
  StyledSettingButton as SettingButton,
  StyledSettingButtonWrapper as SettingButtonWrapper,
  StyledSettingHr as SettingHr,
};
