import styled from "styled-components";
import { ReactComponent as Close } from "../assets/close.svg";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? "block" : "none")};
`;

const Container = styled.div`
  height: 300px;
  width: 100%;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  top: 56px;
  background-color: #ffffff;
  .header {
    height: 41px;
    border-bottom: #e6ecf0 solid 1px;
    .icon {
      margin-left: 16px;
      cursor: pointer;
    }
  }
  .info {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      margin-left: 16px;
    }
    p {
      margin: 0;
      font-weight: 400;
      font-size: 16px;
      color: #6c757d;
    }
  }
  textarea {
    width: calc(100% - 32px);
    height: 40%;
    resize: none;
    border: transparent solid;
    outline: none;
    margin: 0 16px;
  }
`;

const PopupModal = ({ isOpen, closeModal, children }) => {
  return (
    <>
      <Overlay open={isOpen} onClick={closeModal} />
      {isOpen && (
        <Container>
          <div className="header">
            <Close className="icon" onClick={closeModal} />
          </div>
          {children}
        </Container>
      )}
    </>
  );
};

export default PopupModal;
