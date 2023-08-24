import styled from 'styled-components'
import TimeDiff from '../main/TimeDiff'
import * as style from '../common/common.styled'

const Container = styled.div`
    height: 133px;
    width: 100%;
    border-bottom: ${style.styledBorder};
    display: flex;
    img{
        ${style.styledImg};
        margin-left: 24px;
    }
`

const Post = styled.div`
    height: 100%;
    width: calc(100% - 74px);
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .content{
        height: 78px;
        ${style.styledContentFont}
        overflow-wrap: break-word;
    }
`

const Info = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    .name{
        ${style.styledName}
    }
    .account{
        ${style.styledAccount}
    }
`

export default function ReplyCard({name, account, avatar, content, timestamp}){
    return(
        <Container>
            <img src={avatar} alt='avatar'/>
            <Post>
                <Info>
                    <p className='name'>{name}</p>
                    <p className='account'>@{account}・<TimeDiff timestamp={timestamp}/></p>
                </Info>
                <p className='reply-user'>回覆 @{account}</p>
                <p className='content'>{content}</p>
            </Post>
        </Container>
    )
}