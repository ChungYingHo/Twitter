import styled from 'styled-components'
import AdminUserCard from '../components/admin/AdminUserCard'
import * as style from '../components/common/common.styled'
// dummy data
import users from '../dummyData/users'

const Container = styled.div`
  padding: 0;
  border-left: ${style.styledBorder};
  position: relative;
`

const Header = styled.div`
  width: calc(100% + 100px);
  height: 51px;
  margin-top: 24px;
  border-bottom: ${style.styledBorder};
  h4{
    font-weight: 700;
    font-size: 24px;
    margin-left: 24px;
  }
`

const CardContainer = styled.div`
  margin-top: 16px;
  display: flex;
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