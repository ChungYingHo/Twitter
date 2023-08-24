import styled from "styled-components";
import PopularBar from "../components/PopularBar";
import ReplyCard from "../components/reply/ReplyCard";
import { ReactComponent as LeftArrow } from "../assets/left-arrow.svg";
import { ReactComponent as Reply } from "../assets/reply@30.svg";
import { ReactComponent as Like } from "../assets/like@30.svg";
import * as style from "../components/common/common.styled";
// dummy data
import replies from "../dummyData/replies";

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
  height: 335px;
  margin-top: 16px;
  border-bottom: ${style.styledBorder};
  position: relative;
`

const PersonInfo = styled.div`
    margin: 0 16px;
    height: 205px;
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
    height: 108px;
    font-weight: 400;
    font-size: 24px;
    margin-bottom: 8px;
`

const Date = styled.p`
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
    return(
        <>
      <Container className="col">
        <Header>
          <LeftArrow />
          <h4>推文</h4>
        </Header>
        <PostContainer>
            <PersonInfo>
                <Title>
                    <img src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/664.jpg" alt="avatar" />
                    <div>
                        <p className="name">name</p>
                        <p className="account">@account</p>
                    </div>
                </Title>
                <Content>123456789123456789</Content>
                <Date>上午10:55・2022年11月05日</Date>
            </PersonInfo>
            <Counts>
                <div>
                    <p className="num">808</p>
                    <p className="string">回覆</p>
                </div>
                <div>
                    <p className="num">520</p>
                    <p className="string">喜歡次數</p>
                </div>
            </Counts>
            <Interact>
                <Reply/>
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
                    />
                )
            })}
        </CardContainer>
      </Container>
      <PopularBar />
    </>
    )
}