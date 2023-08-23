import styled from 'styled-components'
import AdminPostCard from '../components/admin/AdminPostCard'
import * as style from '../components/common/common.styled'
// dummy data
import posts from '../dummyData/posts'

const Container = styled.div`
  padding: 0;
  border: ${style.styledBorder};
  position: relative;
`

const Header = styled.div`
  width: 100%;
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
  flex-direction: column;
  gap: 8px;
`

export default function AdminTweetPage(){
    return(
        <>
            <Container className='col'>
                <Header>
                    <h4>推文清單</h4>
                </Header>
                <CardContainer>
                    {posts.map(data=>{
                        return(
                            <AdminPostCard
                            key={data.user.id}
                            name={data.user.name}
                            account={data.user.name}
                            avatar={data.user.avatar}
                            content={data.description}
                            timestamp={data.createdAt}
                            />
                        )
                    })}
                </CardContainer>
            </Container>
        </>
    )
}