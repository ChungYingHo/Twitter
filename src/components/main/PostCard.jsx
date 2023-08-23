import styled from 'styled-components'
import TimeDiff from './TimeDiff'
import {ReactComponent as Like} from '../../assets/like.svg'
import {ReactComponent as Reply} from '../../assets/reply.svg'
import * as style from '../common/common.styled'

const Container = styled.div`
    height: 153px;
    border-bottom: ${style.styledBorder};
    display: flex;
    img{
        ${style.styledImg};
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
        height: 78px;
        ${style.styledContentFont}
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

const Interact = styled.div`
    height: 16px;
    width: 120px;
    display: flex;
    justify-content: space-between;
    div{
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p{
            ${style.styledIconFont}
        }
    }
`

export default function PostCard({name, account, avatar, content, timestamp, reply, like}){
    return(
        <Container>
            <img src={avatar} alt='avatar'/>
            <Post>
                <Info>
                    <p className='name'>{name}</p>
                    <p className='account'>@{account}・<TimeDiff timestamp={timestamp}/></p>
                </Info>
                <p className='content'>{content}</p>
                <Interact>
                    <div>
                        <Reply/>
                        <p>{reply}</p>
                    </div>
                    <div>
                        <Like/>
                        <p>{like}</p>
                    </div>
                </Interact>
            </Post>
        </Container>
    )
}