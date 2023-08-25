import styled from 'styled-components'
import { useState, useEffect } from 'react'
import AdminUserCard from '../components/admin/AdminUserCard'
import * as style from '../components/common/common.styled'
// api
import { adminGetUsers } from '../api/admin'

const Container = styled.div`
  outline: blue solid 2px;
  width: 83%;
  padding: 0;
  border-left: ${style.styledBorder};
  position: relative;
`

const Header = styled.div`
  width: calc(100% + (100vw - 960px)/2);
  height: 51px;
  margin-top: 24px;
  border-bottom: ${style.styledBorder};
  h4{
    font-weight: 700;
    font-size: 24px;
    margin-left: 24px;
  }
  @media (min-width: 1200px) {
    width: calc(100% + (100vw - 1140px)/2);
  }
`

const CardContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
`

export default function AdminUserPage(){
    const [users, setUsers] = useState([])
    useEffect(() => {
    const fetchUsers = async () => {
        try {
            const tweetData = await adminGetUsers();
            setUsers(tweetData);
            console.log(tweetData)
        } catch (error) {
            console.error("Fetching Tweets Failed:", error);
        }
        };
        fetchUsers();
    }, [])
    return(
        <>
            <Container >
                <Header>
                    <h4>使用者列表</h4>
                </Header>
                <CardContainer>
                    {users.map(user=>{
                        return(
                            <AdminUserCard
                                key={user.id}
                                name={user.name}
                                account={user.account}
                                banner={user.banner}
                                avatar={user.avatar}
                                posts={user.tweetsCount}
                                likes={user.getLikesCount}
                                follower={user.followersCount}
                                following={user.followingsCount}
                            />
                        )
                    })}
                </CardContainer>
            </Container>
        </>
    )
}