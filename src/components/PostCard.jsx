import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import {ReactComponent as Like} from '../assets/like.svg'
import {ReactComponent as Reply} from '../assets/reply.svg'

const Container = styled.div`
    height: 153px;
    border-bottom: #e6ecf0 solid 1px;
    display: flex;
    img{
        width: 50px;
        height: 50px;
        border-radius: 100%;
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
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            font-family: 'Montserrat', sans-serif;
        }
    }
`

function TimeDifference({ timestamp }) {
  const [timeDiff, setTimeDiff] = useState('');

  useEffect(() => {
    const recordTime = new Date(timestamp);
    const currentTime = new Date();
    const diffMilliseconds = currentTime - recordTime;
    const seconds = Math.floor(diffMilliseconds / 1000);

    if (seconds < 60) {
      setTimeDiff(`${seconds} 秒`);
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      setTimeDiff(`${minutes} 分鐘`);
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      setTimeDiff(`${hours} 小時`);
    } else {
      const days = Math.floor(seconds / 86400);
      setTimeDiff(`${days} 天`);
    }
  }, [timestamp]);

  return <span>{timeDiff}</span>;
}

export default function PostCard({name, account, avatar, content, timestamp, reply, like}){
    
    return(
        <Container>
            <img src={avatar}/>
            <Post>
                <Info>
                    <p className='name'>{name}</p>
                    <p className='account'>{account}・<TimeDifference timestamp={timestamp}/></p>
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