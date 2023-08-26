import styled from "styled-components";
import * as style from '../common/common.styled'

const Container = styled.div`
  height: fit-content;
  min-height: 280px;
  margin-top: 16px;
  .info {
    display: flex;
    img {
      ${style.styledImg}
      margin-left: 16px;
      margin-right: 8px;
    }
    textarea {
      width: calc(100% - 32px);
      height: fit-content;
      min-height: 200px;
      resize: none;
      border: transparent solid;
      outline: none;
      margin-right: 16px;
    }
  }
`

const Btn = styled(style.StyledBtn)`
  width: 64px;
  height: 40px;
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

export default function NewPost({ postContent, setPostContent, handlePostSubmit }) {
  return (
    <Container>
      <div className="info">
        <img src="https://i.imgur.com/jUZg5Mm.png" alt="avatar" />
        <textarea
          minLength="1"
          maxLength="140"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="有什麼新鮮事？"
        ></textarea>
      </div>
      
      <Btn onClick={handlePostSubmit}>推文</Btn>
    </Container>
  );
}
