import styled from "styled-components";
import PopularBar from "../components/PopularBar";
import ReplyCard from "../components/reply/ReplyCard";
import PopupModal from "../components/PopupModal";
import NewReply from "../components/reply/NewReply";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../assets/left-arrow.svg";
import { ReactComponent as Reply } from "../assets/reply@30.svg";
import { ReactComponent as Like } from "../assets/like@30.svg";
import * as style from "../components/common/common.styled";
import { displayTime } from "../components/reply/displayTime";
// API
import { getSingleTweet, getReplies } from "../api/main";

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
    display: flex;
    margin-bottom: 8px;
    img{
        ${style.styledImg}
        margin-right: 8px;
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
                setReplies(sortedReplies);
                console.log(sortedReplies)
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

    return(
    <>
      <Container>
        <Header>
          <LeftArrow />
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
                        <Like/>
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
      <PopularBar />
    </>
    )
}