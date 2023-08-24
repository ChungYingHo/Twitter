import styled from 'styled-components'
import TimeDiff from '../main/TimeDiff'
import { ReactComponent as Close } from "../../assets/close.svg";
import * as style from '../common/common.styled'

const Container = styled.div`
    width: 100%;
    height: 103px;
    border-bottom: ${style.styledBorder};
    display: flex;
    img{
        ${style.styledImg}
        margin-left: 24px;
    }
`

const Post = styled.div`
    height: 100%;
    margin-left: 8px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .content{
        ${style.styledContentFont};
        height: 52px;
        margin: 0;
    }
`

const Info = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    .name{
        ${style.styledName}
    }
    .account{
        ${style.styledAccount}
    }
    .close{
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
    }
    & path{
        fill: #696974;
    }
`

export default function AdminPostCard({name, account, avatar, content, timestamp}){
    return(
        <Container>
            <img src={avatar} alt='avatar'/>
            <Post>
                <Info>
                    <p className='name'>{name}</p>
                    <p className='account'>{account}・<TimeDiff timestamp={timestamp}/></p>
                    <Close className='close'/>
                </Info>
                <p className='content'>{content}</p>
            </Post>
        </Container>
    )
}