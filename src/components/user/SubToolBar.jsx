import styled from "styled-components";
import { useState } from "react";

const SubToolContainer = styled.div`
  border-bottom: 1px solid #e6ecf0;
  height: 53px;
  margin: 20px 0 16px 0;
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

const SubToolBar = () => {
  const [activePage, setActivePage] = useState("post");

  return (
    <SubToolContainer>
      <SubToolBtn
        $isActive={activePage === "post"}
        onClick={() => setActivePage("post")}
      >
        推文
      </SubToolBtn>

      <SubToolBtn
        $isActive={activePage === "replies"}
        onClick={() => setActivePage("replies")}
      >
        回覆
      </SubToolBtn>

      <SubToolBtn
        $isActive={activePage === "likes"}
        onClick={() => setActivePage("likes")}
      >
        喜歡的內容
      </SubToolBtn>
    </SubToolContainer>
  );
};

export default SubToolBar;
