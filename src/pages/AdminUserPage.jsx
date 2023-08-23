import styled from 'styled-components'
import AdminUserCard from '../components/AdminUserCard'
// dummy data
import users from '../dummyData/users'

const Container = styled.div`
  padding: 0;
  border: #e6ecf0 solid 1px;
  position: relative;
`

const Header = styled.div`
  width: 100%;
  height: 51px;
  margin-top: 24px;
  border-bottom: #e6ecf0 solid 1px;
  h4{
    font-weight: 700;
    font-size: 24px;
    margin-left: 24px;
  }
`

const CardContainer = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

export default function AdminUserPage(){
    return(
        <>
            <Container className='col'>
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