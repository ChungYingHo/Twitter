import styled from "styled-components";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as acLogo } from "../assets/logo.svg";
import { ReactComponent as Home } from "../assets/home.svg";
import { ReactComponent as Info } from "../assets/personInfo.svg";
import { ReactComponent as Setting } from "../assets/setting.svg";
import { ReactComponent as Logout } from "../assets/logout.svg";
import * as style from "../components/common/common.styled";

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 15.6%;
`;

const Logo = styled(acLogo)`
  position: absolute;
  top: 8px;
  left: 8px;
`;

const ToolContainer = styled.div`
  height: 244px;
  width: 100%;
  position: absolute;
  top: 66px;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Nav = styled(Link)`
  height: 58px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000000;

  &:hover {
    color: #000000;
  }

  div {
    padding-left: 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
    color: ${({ $isActive }) => ($isActive ? "#ff6600" : "inherit")};
    & path {
      fill: ${({ $isActive }) => ($isActive ? "#ff6600" : "#000000")};
    }
  }
`;

const Btn = styled(style.StyledBtn)`
  height: 46px;
  width: 100%;
  padding: 8px 24px;
  font-size: 20px;
`;

const FooterContainer = styled.div`
  height: 58px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;

  div {
    padding-left: 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
  }
`;

export default function Toolbar() {
  const getActivePage = (pathname) => {
    if (pathname === "/main") {
      return "home";
    } else if (pathname === "/user") {
      return "user";
    } else if (pathname === "/setting") {
      return "setting";
    }
    return "default";
  };
  const location = useLocation();
  const [activePage, setActivePage] = useState(
    getActivePage(location.pathname)
  );

  const navigate = useNavigate();

  const handleClick = () => {
    console.log(localStorage);
    localStorage.removeItem("UserToken");
    localStorage.removeItem("userID");

    navigate("/login");
  };

  return (
    <Container>
      <Logo />
      <ToolContainer>
        <Nav
          $isActive={activePage === "home"}
          onClick={() => setActivePage("home")}
          to="/main"
        >
          <div>
            <Home />
            首頁
          </div>
        </Nav>
        <Nav
          $isActive={activePage === "user"}
          onClick={() => setActivePage("user")}
          to="/user"
        >
          <div>
            <Info />
            個人資料
          </div>
        </Nav>
        <Nav
          $isActive={activePage === "setting"}
          onClick={() => setActivePage("setting")}
          to="/setting"
        >
          <div>
            <Setting />
            設定
          </div>
        </Nav>
        <Btn>推文</Btn>
      </ToolContainer>
      <FooterContainer onClick={handleClick}>
        <div>
          <Logout />
          登出
        </div>
      </FooterContainer>
    </Container>
  );
}
