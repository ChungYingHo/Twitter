// package
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// component and style
import { ReactComponent as acLogo } from "../assets/logo.svg";
import { ReactComponent as Home } from "../assets/home.svg";
import { ReactComponent as Info } from "../assets/personInfo.svg";
import { ReactComponent as Setting } from "../assets/setting.svg";
import { ReactComponent as Logout } from "../assets/logout.svg";
import * as style from "../components/common/common.styled";
// api and function
import { usePopup } from "../context/Popup";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  padding: 0;
  position: sticky;
  top: 0;
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

const Nav = styled.div`
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


// component
export default function Toolbar() {
  const navigate = useNavigate();
  const { openNewPost } = usePopup();
  const id = localStorage.getItem('userID')

  // 監控正在哪條路由下
  const location = useLocation();
  const { id: userId } = useParams();

  // 登出功能
  const handleClick = () => {
    localStorage.removeItem("UserToken");
    localStorage.removeItem("userID");
    navigate("/login");
  };

  // 發文跳轉功能
  const handlePost = () => {
    navigate("/main");
    openNewPost(); // 呼叫openNewPost來顯示彈出視窗
  };

  return (
    <Container>
      <Logo />
      <ToolContainer>
        <Nav
          $isActive={location.pathname.startsWith("/main")}
          onClick={()=>navigate('/main')}
        >
          <div>
            <Home />
            首頁
          </div>
        </Nav>
        <Nav
          $isActive={location.pathname.startsWith("/user")}
          onClick={()=>navigate(`/user/${id}`)}
        >
          <div>
            <Info />
            個人資料
          </div>
        </Nav>
        <Nav
          $isActive={!userId && location.pathname.startsWith("/setting")}
          onClick={()=>navigate(`/setting`)}
        >
          <div>
            <Setting />
            設定
          </div>
        </Nav>
        <Btn onClick={handlePost}>推文</Btn>
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
