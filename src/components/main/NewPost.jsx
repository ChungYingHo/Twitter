import styled from "styled-components";
import * as style from '../common/common.styled'

const Container = styled.div`
  margin-top: 16px;
  .info {
    display: flex;
    align-items: center;
    img {
      ${style.styledImg}
      margin-left: 16px;
      margin-right: 8px;
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
`

const Btn = styled(style.StyledBtn)`
  width: 64px;
  height: 40px;
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

export default function NewPost() {
  return (
    <Container>
      <div className="info">
        <img src="https://i.imgur.com/jUZg5Mm.png" alt="avatar" />
        <p>有什麼新鮮事？</p>
      </div>
      <textarea minLength="1" maxLength="140"></textarea>
      <Btn>推文</Btn>
    </Container>
  );
}
