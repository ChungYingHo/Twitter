import styled from 'styled-components'
import TimeDiff from '../main/TimeDiff'

const Container = styled.div`
    width: 100%;
    height: 103px;
    border-bottom: #e6ecf0 solid 1px;
    display: flex;
    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 24px;
    }
`

const Post = styled.div`
    height: 100%;
    margin-right: 24px;
    margin-left: 8px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .content{
        height: 52px;
        font-size: 16px;
        font-weight: 400;
        margin: 0;
    }
`

const Info = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    .name{
        font-weight: 700;
        font-size: 16px;
        margin: 0;
    }
    .account{
        font-weight: 400;
        font-size: 14px;
        color: #6c757d;
        margin: 0;
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
                </Info>
                <p className='content'>{content}</p>
            </Post>
        </Container>
    )
}