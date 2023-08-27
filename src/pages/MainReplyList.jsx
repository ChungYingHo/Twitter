import styled from "styled-components";
import ReplyCard from "../components/reply/ReplyCard";
import PopupModal from "../components/PopupModal";
import NewReply from "../components/reply/NewReply";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../assets/left-arrow.svg";
import { ReactComponent as Reply } from "../assets/reply@30.svg";
import { ReactComponent as Like } from "../assets/like@30.svg";
import { ReactComponent as LikeFill } from "../assets/like@30_fill.svg";
import * as style from "../components/common/common.styled";
import { displayTime } from "../components/reply/displayTime";
// API
import { getSingleTweet,
         getReplies,
         postReply,
         likeTweet,
        dislikeTweet
    } from "../api/main";
import { checkPermission } from "../api/Permission";

const Container = styled.div`
  width: 56.2%;
  padding: 0;
  border: ${style.styledBorder};
  position: relative;
`

const Header = styled.div`
  outline: red solid 2px;
  width: 100%;
  height: 51px;
  margin-top: 24px;
  border-bottom: ${style.styledBorder};
  display: flex;
  align-items: center;
  h4 {
    font-weight: 700;
    font-size: 24px;
    margin-left: 24px;
    margin-bottom: 0;
  }
`

const StyledArrow = styled(LeftArrow)`
    cursor: pointer;
`

const PostContainer = styled.div`
  outline: red solid 2px;
  height: fit-content;

  margin-top: 16px;
  border-bottom: ${style.styledBorder};
  position: relative;
`

const PersonInfo = styled.div`
    margin: 0 16px;
    height: fit-content;
    min-height: 205px;

    border-bottom: ${style.styledBorder};
`

const Title = styled.div`
    outline: black solid 2px;
    display: flex;
    margin-bottom: 8px;
    img{
        ${style.styledImg}
        margin-right: 8px;
    }
    div{
        outline: blue solid 2px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p{
            outline: red solid 2px;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    .name{
        ${style.styledName}
    }
    .account{
        ${style.styledAccount}
    }
`

const Content = styled.p`
    min-height: 108px;
    font-weight: 400;
    font-size: 24px;
    margin-bottom: 8px;
    overflow-wrap: break-word;
`

const StyledDate = styled.p`
    ${style.styledAccount};
    font-weight: 500;
`

const Counts = styled.div`
    margin: 0 16px;
    height: 45px;
    border-bottom: ${style.styledBorder};
    display: flex;
    align-items: center;
    div{
        display: flex;
        align-items: center;
        gap: 4px;
        margin-right: 24px;
        p{
            margin: 0;
            font-size: 19px;
            font-weight: 500;
        }
        .num{
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
        }
    }
`

const Interact = styled.div`
    margin: 16px;
    height: 36px;
    width: 188px;
    display: flex;
    justify-content: space-between;
`

const CardContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;


export default function MainReplyList(){
    const { tweet_id } = useParams()
    const navigate = useNavigate()
    // 驗證 token
    useEffect(() => {
        const checkTokenIsValid = async () => {
        const authToken = localStorage.getItem('UserToken');
        if (!authToken) {
            navigate('/login');
        }
        const result = await checkPermission(authToken);
        if (!result) {
            navigate('/login');
        }
        };

        checkTokenIsValid();
    }, [navigate])
    // 抓特定貼文
    const [tweet, setTweet] = useState(null)
    useEffect(() => {
        const fetchSingleTweet = async () => {
            try {
                const tweetData = await getSingleTweet({ tweet_id: parseInt(tweet_id) });
                setTweet(tweetData);
                console.log(tweetData)
            } catch (error) {
                console.error('Fetching Single Tweet Failed:', error);
            }
            };
            fetchSingleTweet();
    }, [tweet_id])
    // 抓這篇貼文的全部回覆
    const [replies, setReplies] = useState([])
    useEffect(() => {
        const fetchingReplies = async ()=>{
            try{
                const repliesData = await getReplies({ tweet_id: parseInt(tweet_id) });
                const sortedReplies = repliesData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                setReplies(sortedReplies)
            } catch (error){
                console.error('Fetching Replies Failed:', error)
            }
        }
        fetchingReplies()
    }, [tweet_id])
    // 彈出回覆視窗
    const [isNewPostOpen, setIsNewPostOpen] = useState(false)
    const openNewPost = () => {
        setIsNewPostOpen(true);
    };
    const closeNewPost = () => {
        setIsNewPostOpen(false);
    }
    // 新增一筆回覆
    const [replyContent, setReplyContent] = useState('')
    const handleReplySubmit = async ()=>{
        try{
            await postReply({tweet_id, comment: replyContent})
            console.log('Reply successful!')
            // 發出去就清空 textarea
            setReplyContent('')
            const updatedReplies = await getReplies({ tweet_id: parseInt(tweet_id) })
            const sortedUpdatedReplies = updatedReplies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            setReplies(sortedUpdatedReplies)
            closeNewPost()
        } catch (error){
            console.error('Replying Tweet Failed:', error)
        }
    }
    // 喜愛這篇貼文
    const handleLike = async ()=>{
        try{
            await likeTweet({tweet_id})
            console.log('Like Successful!')
            setTweet((prevTweet) => ({
                ...prevTweet,
                isLiked: true,
                likesCount: prevTweet.likesCount + 1,
            }))
        } catch(error){
            console.error('Like Tweet failed:', error)
        }
    }
    // 取消喜愛這篇貼文
    const handleDislike = async ()=>{
        try{
            await dislikeTweet({tweet_id})
            console.log('Dislike Successful!')
            setTweet((prevTweet) => ({
                ...prevTweet,
                isLiked: false,
                likesCount: prevTweet.likesCount - 1,
            }))
        } catch(error){
            console.error('Dislike Tweet failed:', error)
        }
    }

    return(
    <>
      <Container>
        <Header>
          <StyledArrow onClick={() => navigate(`/main`)}/>
          <h4>推文</h4>
        </Header>
        {tweet && replies && (
            <>
                <PopupModal isOpen={isNewPostOpen} closeModal={closeNewPost}>
                    <NewReply
                        name={tweet.User.name}
                        account={tweet.User.account}
                        timestamp={tweet.createdAt}
                        avatar={tweet.User.avatar}
                        content={tweet.description}
                        replyContent={replyContent}
                        setReplyContent={setReplyContent}
                        handleReplySubmit={handleReplySubmit}
                    />
                </PopupModal>
                <PostContainer>
                    <PersonInfo>
                        <Title>
                            <img src={tweet.User.avatar} alt="avatar" />
                            <div>
                                <p className="name">{tweet.User.name}</p>
                                <p className="account">@{tweet.User.account}</p>
                            </div>
                        </Title>
                        <Content>{tweet.description}</Content>
                        <StyledDate>{displayTime(tweet.createdAt)}</StyledDate>
                    </PersonInfo>
                    <Counts>
                        <div>
                            <p className="num">{tweet.repliesCount}</p>
                            <p className="string">回覆</p>
                        </div>
                        <div>
                            <p className="num">{tweet.likesCount}</p>
                            <p className="string">喜歡次數</p>
                        </div>
                    </Counts>
                    <Interact>
                        <Reply onClick={openNewPost}/>
                        {tweet.isLiked ? <LikeFill onClick={handleDislike}/> : <Like onClick={handleLike}/>}
                    </Interact>
                </PostContainer>

                <CardContainer>
                    {replies.map(reply=>{
                        return(
                            <ReplyCard
                                key={reply.id}
                                name={reply.User.name}
                                account={reply.User.account}
                                avatar={reply.User.avatar}
                                content={reply.comment}
                                timestamp={reply.createdAt}
                                replyAccount={tweet.User.account}
                            />
                        )
                    })}
                </CardContainer>
            </>
        )}

      </Container>
    </>
    )
}