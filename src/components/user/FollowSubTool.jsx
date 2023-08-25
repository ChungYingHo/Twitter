import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

const SubToolContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6ecf0;
  height: 53px;
`;

const SubToolBtn = styled.button`
  width: 120px;
  padding: 15px 0;
  border: none;
  background-color: transparent;
  color: ${({ $isActive }) => ($isActive ? "#ff6600" : "#657786")};
  border-bottom: ${({ $isActive }) =>
    $isActive ? "2px solid  #ff6600" : "none"};
  font-size: 15px;
  font-weight: 700;
  line-height: 21px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0;
  padding: 0;
`;

const FollowrSubTool = () => {
  const [activePage, setActivePage] = useState("followers");

  return (
    <SubToolContainer>
      <StyledLink to="/user/followers">
        <SubToolBtn
          $isActive={activePage === "followers"}
          onClick={() => setActivePage("followers")}
        >
          追隨者
        </SubToolBtn>
      </StyledLink>

      <StyledLink to="/user/following">
        <SubToolBtn
          $isActive={activePage === "following"}
          onClick={() => setActivePage("following")}
        >
          正在追隨
        </SubToolBtn>
      </StyledLink>
    </SubToolContainer>
  );
};

export default FollowrSubTool;
