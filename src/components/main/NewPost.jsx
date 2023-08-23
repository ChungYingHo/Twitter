import styled from 'styled-components'
import * as style from '../common/common.styled'

const Container = styled.div`
    height: 300px;
    width: 100%;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: absolute;
    top: 56px;
    background-color: ${style.colors.white};
    .header{
        height: 41px;
        border-bottom: ${style.styledBorder};
        .icon{
            margin-left: 16px;
            cursor: pointer;
        }
    }
    .info{
        display: flex;
        align-items: center;
        img{
            ${style.styledImg}
            margin-left: 16px;
        }
        p{
            margin: 0 0 0 8px;
            font-weight: 400;
            font-size: 16px;
            color: #6c757d;
        }
    }
    textarea{
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
`

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
