import styled from 'styled-components'
import {ReactComponent as Posts} from '../assets/posts.svg'
import {ReactComponent as Likes} from '../assets/like@24.svg'

const Container = styled.div`
    width: 210px;
    height: 314px;
    border-radius: 10px 10px 0 0;
    background-color: #f6f7f8;
    position: relative;
    .bg-img{
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 10px 10px 0 0;
    }
    .info{
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
            border: #ffffff solid 4px;
        }
        p{
            margin: 0;
        }
        .name{
            font-weight: 700;
            font-size: 16px;
        }
        .account{
            font-weight: 400;
            font-size: 14px;
            color: #6c757d;
        }
    }
    .interact{
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
    }
    .follow-info{
        width: 158px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        top: 268px;
        left: 26px;
        p{
            font-size: 14px;
            font-weight: 400;
        }
    }
`

export default function AdminUserCard({name, account, banner, avatar, posts, likes, follower, following}){
    return(
        <Container>
            <img src={banner} alt="background" className='bg-img'/>
            <div className='info'>
                <img src={avatar} alt="avatar" />
                <p className='name'>{name}</p>
                <p className='account'>@{account}</p>
            </div>
            <div className='interact'>
                <div>
                    <Posts/>
                    <p>{posts}</p>
                </div>
                <div>
                    <Likes/>
                    <p>{likes}</p>
                </div>
            </div>
            <div className='follow-info'>
                <p>{following}位跟隨中</p>
                <p>{follower}位跟隨者</p>
            </div>
        </Container>
    )
}