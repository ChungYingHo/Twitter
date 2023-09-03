import styled from "styled-components";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as acLogo } from "../../assets/logo.svg";
import { ReactComponent as Home } from "../../assets/home.svg";
import { ReactComponent as User } from "../../assets/personInfo.svg";
import { ReactComponent as Logout } from "../../assets/logout.svg";

const Container = styled.div`
  width: 15.6%;
  position: sticky;
  height: 100vh;
  top: 0;
`;

const Logo = styled(acLogo)`
  position: absolute;
  top: 8px;
  left: 8px;
`;

const ToolContainer = styled.div`
  height: 124px;
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

export default function AdminSideBar() {
  const getActivePage = (pathname) => {
    if (pathname === "/admin_tweets") {
      return "home";
    } else if (pathname === "/admin_users") {
      return "user";
    }
    return "default";
  };
  const location = useLocation();
  const [activePage, setActivePage] = useState(
    getActivePage(location.pathname)
  );

  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("AdminToken");
    navigate("/admin_login");
  };

  return (
    <Container>
      <Logo />
      <ToolContainer>
        <Nav
          to="/admin_tweets"
          $isActive={activePage === "home"}
          onClick={() => setActivePage("home")}
        >
          <div>
            <Home />
            推文清單
          </div>
        </Nav>
        <Nav
          to="/admin_users"
          $isActive={activePage === "user"}
          onClick={() => setActivePage("user")}
        >
          <div>
            <User />
            使用者列表
          </div>
        </Nav>
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
