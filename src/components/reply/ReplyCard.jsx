import styled from 'styled-components'
import TimeDiff from '../main/TimeDiff'
import * as style from '../common/common.styled'

const Container = styled.div`
    min-height: 133px;
    height: fit-content;
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
    margin-right: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    p{
        margin: 0;
    }
    .reply-user{
        display: flex;
        align-items: center;
        p{
            color: ${style.colors.orange};
            margin-left: 4px;
        }
    }
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

export default function ReplyCard({name, account, avatar, content, timestamp, replyAccount}){

    return(
        <Container>
            <img src={avatar} alt='avatar'/>
            <Post>
                <Info>
                    <p className='name'>{name}</p>
                    <p className='account'>@{account}・<TimeDiff timestamp={timestamp}/></p>
                </Info>
                <div className='reply-user'>回覆 <p>@{replyAccount}</p></div>
                <p className='content'>{content}</p>
            </Post>
        </Container>
    )
}