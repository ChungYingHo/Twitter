import styled from 'styled-components'
import {ReactComponent as Posts} from '../../assets/posts.svg'
import {ReactComponent as Likes} from '../../assets/like@24.svg'
import * as style from '../common/common.styled'

const Container = styled.div`
    width: 210px;
    height: 314px;
    border-radius: 10px 10px 0 0;
    background-color: ${style.colors.Gray};
    margin-left: 8px;
    margin-top: 8px;
    position: relative;
    .bg-img{
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 10px 10px 0 0;
    }
`

const Info = styled.div`
    width: 100px;
    height: 154px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 64px;
    left: 55px;
    img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: ${style.colors.white} solid 4px;
    }
    p{
        width: 180px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

    }
    .name{
        ${style.styledName}
    }
    .account{
        ${style.styledAccount}
    }
`

const Interact = styled.div`
    width: 139px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 234px;
    left: 35px;
    div{
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p{
            margin: 0;
        }
    }
`

const FollowInfo = styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 268px;
    left: 26px;
    p{
        font-size: 14px;
        font-weight: 400;
        margin: 0 4px;
    }
`

export default function AdminUserCard({name, account, banner, avatar, posts, likes, follower, following}){
    return(
        <Container>
            <img src={banner} alt="background" className='bg-img'/>

            <Info>
                <img src={avatar} alt="avatar" />
                <p className='name'>{name}</p>
                <p className='account'>@{account}</p>
            </Info>
            <Interact>
                <div>
                    <Posts/>
                    <p>{posts}</p>
                </div>
                <div>
                    <Likes/>
                    <p>{likes}</p>
                </div>
            </Interact>
            <FollowInfo>
                <p>{following}位跟隨中</p>
                <p>{follower}位跟隨者</p>
            </FollowInfo>
        </Container>
    )
}