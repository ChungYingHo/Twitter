import styled from 'styled-components'
import {ReactComponent as Close} from '../assets/close.svg'

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
    .header{
        height: 41px;
        border-bottom: #e6ecf0 solid 1px;
        .icon{
            margin-left: 16px;
            cursor: pointer;
        }
    }
    .info{
        display: flex;
        align-items: center;
        img{
            width: 50px;
            height: 50px;
            border-radius: 100%;
            margin-left: 16px;
        }
        p{
            margin: 0;
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

    &:active{
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) inset
    }
`

export default function NewPost({onClick}){
    return(
        <Container>
            <div className='header'>
                <Close className='icon' onClick={onClick}/>
            </div>
            <div className='info'>
                <img src="https://i.imgur.com/jUZg5Mm.png" alt='avatar'/>
                <p>有什麼新鮮事？</p>
            </div>
            <textarea minLength='1' maxLength='140'></textarea>
            <Btn>推文</Btn>
        </Container>
    )
}