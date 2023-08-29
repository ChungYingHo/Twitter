import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import TimeDiff from './TimeDiff'
import {ReactComponent as Like} from '../../assets/like.svg'
import {ReactComponent as Reply} from '../../assets/reply.svg'
import * as style from '../common/common.styled'

const Container = styled.div`
    height: fit-content;
    max-width: 100%;
    border-bottom: ${style.styledBorder};
    display: flex;
    img{
        ${style.styledImg};
        margin-left: 24px;
    }
`

const Post = styled.div`
    height: 100%;
    overflow: hidden;
    margin-right: 24px;
    margin-left: 8px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .content{
        height: auto;
        ${style.styledContentFont};
        overflow-wrap: break-word;
    }
`

const Info = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    p{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .name{
        ${style.styledName}
        max-width: 40%;
    }
    .account{
        ${style.styledAccount}
        max-width: 60%;
    }
`

const Interact = styled.div`
    height: 16px;
    width: 120px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    div{
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p{
            ${style.styledIconFont}
            color: ${style.colors.darkGray};
        }
    }
`

export default function PostCard({id, name, account, avatar, content, timestamp, reply, like, onPostCardClick, userId}){
    const navigate = useNavigate();
    return(
        <Container>

            <img src={avatar} alt='avatar' onClick={()=>navigate(`/user/${userId}`)}/>
            <Post>
                <Info>
                    <p className='name'>{name}</p>
                    <p className='account'>@{account}・<TimeDiff timestamp={timestamp}/></p>
                </Info>
                <p className='content' onClick={()=>navigate(`/main/${id}`)}>{content}</p>
                <Interact>
                    <div onClick={onPostCardClick}>
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