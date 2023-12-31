import styled from "styled-components";
import * as style from "./common/common.styled";
import { ReactComponent as Close } from "../assets/close.svg";

const Overlay = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? "block" : "none")};
`;

const Container = styled.div`
  z-index: 101;
  height: fit-content;
  width: 640px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 56px;
  background-color: #ffffff;
`;

const Header = styled.div`
  width: 100%;
  height: 49px;
  display: flex;
  align-items: center;
  border-bottom: ${style.styledBorder};
  padding: 0 16px;
  margin-top: 8px;
  .icon {
    cursor: pointer;
  }
`;

const HeaderWrapper = styled.div`
  width: 600px;
  margin-left: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// component
const PopupModal = ({
  isOpen,
  closeModal,
  children,
  headerTitle,
  headerButton,
}) => {
  return (
    <>
      <Overlay open={isOpen} onClick={closeModal} />
      {isOpen && (
        <Container>
          <Header>
            <Close className="icon" onClick={closeModal} />
            <HeaderWrapper>
              {headerTitle}
              {headerButton}
            </HeaderWrapper>
          </Header>
          {children}
        </Container>
      )}
    </>
  );
};

export default PopupModal;
