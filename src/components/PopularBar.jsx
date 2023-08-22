import styled from 'styled-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PopularCard from './commons/PopularCard'
// 測試用 dummydata
import users from '../dummyData/popularUsers'

const Container = styled.div`
    margin-top: 16px;
    padding: 0;
    height: 731px;
    background-color: #fafafb;
    border-radius: 16px;
`

const Title = styled.div`
    height: 74px;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: #e6ecf0 solid 1px;
    div{
        padding-left: 24px;
        font-weight: 700;
        font-size: 24px;
    }
`
const CardContainer = styled.div`
    height: 657px;
    width: 100%;
`

export default function PopularBar(){
    const [usersData, setUsersData] = useState(users)
    // 點擊切換 isFollowed 狀態
    const handleFollow = (userId) => {
        setUsersData((prevUsersData) =>
            prevUsersData.map((user) =>
                user.user.id === userId
                    ? { ...user, user: { ...user.user, isFollowed: !user.user.isFollowed } }
                    : user
            )
        )
    }

    return(
        <Container className='col-3'>
            <Title>
                <div>推薦跟隨</div>
            </Title>
            <CardContainer>
                {usersData.map(info=>{
                    return (
                        <PopularCard
                            key={info.user.id}
                            avatar={info.user.avatar}
                            name={info.user.name}
                            account={info.user.name}
                            isFollowed={info.user.isFollowed}
                            onClick={() => handleFollow(info.user.id)}
                        />
                    )
                })}
            </CardContainer>
        </Container>
    )
}