import styled from 'styled-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as acLogo} from '../assets/logo.svg'
import {ReactComponent as Home} from '../assets/home.svg'
import {ReactComponent as Info} from '../assets/personInfo.svg'
import {ReactComponent as Setting} from '../assets/setting.svg'
import {ReactComponent as Logout} from '../assets/logout.svg'



const Container = styled.div`
    position: relative;
    height: 100vh;
`

const Logo = styled(acLogo)`
    position: absolute;
    top: 8px;
    left: 8px;
`

const ToolContainer = styled.div`
    height: 244px;
    width: 100%;
    position: absolute;
    top: 66px;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Nav = styled.div`
    height: 58px;
    display: flex;
    align-items: center;

    div{
        padding-left: 16px;
        display: flex;
        align-items: center;
        gap: 16px;
        font-weight: 700;
        font-size: 18px;
        color: ${props => (props.isActive ? "#ff6600" : "inherit")};
        cursor: pointer;
        & path{
            fill: ${props => (props.isActive ? "#ff6600" : "#000000")};
        }
    }
`

const Btn = styled.button`
    height: 46px;
    width: 100%;
    padding: 8px 24px;
    border-radius: 50px;
    border: transparent solid;
    background-color: #ff6600;
    font-weight: 400;
    font-size: 20px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active{
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) inset
    }
`

const FooterContainer = styled.div`
    height: 58px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;

    div{
        padding-left: 16px;
        display: flex;
        align-items: center;
        gap: 16px;
        font-weight: 700;
        font-size: 18px;
        cursor: pointer;
    }
`



export default function Toolbar(){
    const [activePage, setActivePage] = useState('home')

    return(
        <Container className='col-2'>
            <Logo/>
            <ToolContainer>
                <Nav isActive={activePage === 'home'} onClick={() => setActivePage('home')}>
                    <div>
                        <Home />
                        首頁
                    </div>
                </Nav>
                <Nav isActive={activePage === 'profile'} onClick={() => setActivePage('profile')}>
                    <div>
                        <Info />
                        個人資料
                    </div>
                </Nav>
                <Nav isActive={activePage === 'setting'} onClick={() => setActivePage('setting')}>
                    <div>
                        <Setting />
                        設定
                    </div>
                </Nav>
                <Btn>推文</Btn>
            </ToolContainer>
            <FooterContainer>
                <div>
                    <Logout/>
                    登出
                </div>
            </FooterContainer>
        </Container>
    )
}