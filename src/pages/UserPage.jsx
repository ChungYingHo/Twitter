import { ReactComponent as LeftArrow } from "../assets/left-arrow.svg";
import { Link } from "react-router-dom";
import ToolBar from "../components/Toolbar";
import PopularBar from "../components/PopularBar";
import UserInfo from "../components/user/UserInfo";
import SubToolBar from "../components/user/SubToolBar";
import styled from "styled-components";

const UserMainContainer = styled.div`
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  height: 100%;
`;

const UserTittleWrapper = styled.div`
  width: 100%;
  height: 59px;
  margin-top: 16px;
  padding: 0 30px;
  display: flex;
  align-items: center;
`;

const UserNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 5px;
  margin-left: 16px;
`;

const UserName = styled.h5`
  font-weight: 700;
  margin-bottom: 0;
`;

const UserPostCount = styled.p`
  font-size: 13px;
  color: #6c757d;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #171725;
`;

const UserPage = () => {
  return (
    <>
      <ToolBar />
      <div className="col">
        <UserMainContainer>
          <StyledLink to="/main">
            <UserTittleWrapper>
              <LeftArrow />
              <UserNameWrapper>
                <UserName>Egg Head</UserName>
                <UserPostCount>25 推文</UserPostCount>
              </UserNameWrapper>
            </UserTittleWrapper>
          </StyledLink>
          <UserInfo />
          <SubToolBar />
        </UserMainContainer>
      </div>
      <PopularBar />
    </>
  );
};

export default UserPage;