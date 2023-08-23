import styled from "styled-components";

const Btn = styled.button`
  width: 64px;
  height: 40px;
  border-radius: 50px;
  border: transparent solid;
  background-color: #ff6600;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 16px;
  right: 16px;

  &:active {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) inset;
  }
`;

export default function NewPost() {
  return (
    <>
      <div className="info">
        <img src="https://i.imgur.com/jUZg5Mm.png" alt="avatar" />
        <p>有什麼新鮮事？</p>
      </div>
      <textarea minLength="1" maxLength="140"></textarea>
      <Btn>推文</Btn>
    </>
  );
}
