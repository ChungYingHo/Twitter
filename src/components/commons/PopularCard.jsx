import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 82px;
    display: flex;
    align-items: center;
`

const Img = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 100%;
    margin-left: 16px;
    margin-right: 8px;
`

const InfoContainer = styled.div`
    height: 47px;
    width: 84px;
    flex: 1;
    display: flex;
    flex-direction: column;
    p{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .name{
        font-weight: 700;
        font-size: 16px;
        margin: 0;
    }
    .account{
        font-weight: 400;
        font-size: 14px;
        color: #6c757d;
        margin: 0;
    }
`

const Btn = styled.button`
    height: 40px;
    border-radius: 50px;
    ${({isFollowed})=>
        isFollowed ?
            `width: 96px;
             background-color: #ff6600;
             border: #ff6600 solid 1px;
             color: #ffffff;`
             :
             `width: 64px;
             background-color: #ffffff;
             border: #ff6600 solid 1px;
             color: #ff6600;`
    }
    &:active{
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) inset
    }
`


export default function PopularCard({avatar, name, account, isFollowed, onClick, ...props}){
    return(
        <Container>
            <Img src={avatar}/>
            <InfoContainer>
                <p className='name'>{name}</p>
                <p className='account'>@{account}</p>
            </InfoContainer>
            <Btn isFollowed={isFollowed} onClick={onClick}>{isFollowed ? '正在跟隨' : '跟隨'}</Btn>
        </Container>
    )
}