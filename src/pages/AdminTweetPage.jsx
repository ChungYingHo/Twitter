import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import AdminPostCard from '../components/admin/AdminPostCard'
import * as style from '../components/common/common.styled'
// api
import { adminGetTweets, adminDeleteTweet } from '../api/admin'
import { checkAdminPermission } from '../api/Permission'

const Container = styled.div`
  outline: blue solid 2px;
  width: 83%;
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
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export default function AdminTweetPage(){
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    // 驗證 token
    useEffect(() => {
      const checkTokenIsValid = async () => {
        const authToken = localStorage.getItem('AdminToken');
        if (!authToken) {
          navigate('/admin_login');
        }
        const result = await checkAdminPermission(authToken);
        if (!result) {
          navigate('/admin_login');
        }
      }
      checkTokenIsValid();
    }, [navigate])
    // 取得所有貼文
    useEffect(() => {
    const fetchTweets = async () => {
        try {
          const tweetData = await adminGetTweets()
          const sortedTweets = tweetData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          setPosts(sortedTweets)
        } catch (error) {
          console.error("Admin fetching Tweets Failed:", error);
        }
      };
      fetchTweets();
    }, [])

    const handleDelete = async (id)=>{
      try{
        const success = await adminDeleteTweet({ id });
        if (success) {
          setPosts((prevPosts) =>
            prevPosts.filter((post) =>
              post.id !== id));
          console.log('Delete successful');
        } else {
          console.log('Delete failed');
        }
      } catch (error){
        console.error("Delete Tweet Failed:", error)
      }
    }

    return(
        <>
            <Container>
                <Header>
                    <h4>推文清單</h4>
                </Header>
                <CardContainer>
                    {posts.map(data=>{
                        return(
                            <AdminPostCard
                            key={data.id}
                            name={data.User.name}
                            account={data.User.name}
                            avatar={data.User.avatar}
                            content={data.description}
                            timestamp={data.createdAt}
                            onClick={()=>handleDelete(data.id)}
                            />
                        )
                    })}
                </CardContainer>
            </Container>
        </>
    )
}