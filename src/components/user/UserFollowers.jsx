import styled from "styled-components";
import * as style from "../common/common.styled";
import { ReactComponent as LeftArrow } from "../../assets/left-arrow.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FollowrSubTool from "./FollowSubTool";
import FollowCard from "./FollowCard";
// api
import { checkPermission } from "../../api/Permission";

// dummyData
import users from "../../dummyData/popularUsers";

const Container = styled.div`
  outline: green solid 2px;
  padding: 0;
  width: 56.2%;
  border: ${style.styledBorder};
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  height: 59px;
  margin-top: 16px;
  border-bottom: ${style.styledBorder};
  display: flex;
  align-items: center;
  padding: 0 30px;

  h5 {
    font-weight: 700;
    font-size: 18px;
    margin: 0 0 2px 0;
  }
  p {
    font-size: 13px;
    color: #6c757d;
  }
`;

const HeaderTittleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 16px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0;
  padding: 0;
  color: #171725;
  &:hover {
    color: #171725;
  }
`;

const UserFollowers = () => {
  const [usersData, setUsersData] = useState(users);
  const navigate = useNavigate()
    // 驗證 token
    useEffect(() => {
        const checkTokenIsValid = async () => {
        const authToken = localStorage.getItem('UserToken');
        if (!authToken) {
            navigate('/login');
        }
        const result = await checkPermission(authToken);
        if (!result) {
            navigate('/login');
        }
        };

        checkTokenIsValid();
    }, [navigate])

  const handleFollow = (userId) => {
    setUsersData((prevUsersData) =>
      prevUsersData.map((user) =>
        user.user.id === userId
          ? {
              ...user,
              user: { ...user.user, isFollowed: !user.user.isFollowed },
            }
          : user
      )
    );
  };

  return (
    <>
      <Container>
        <StyledLink to="/user">
          <Header>
            <LeftArrow />
            <HeaderTittleWrapper>
              <h5>Egg Head</h5>
              <p>25推文</p>
            </HeaderTittleWrapper>
          </Header>
        </StyledLink>
        <FollowrSubTool activePage="followers" />
        {usersData.map((data) => {
          return (
            <>
              <FollowCard
                key={data.user.id}
                id={data.user.id}
                name={data.user.name}
                avatar={data.user.avatar}
                introduction={data.user.introduction}
                isFollowed={data.user.isFollowed}
                onClick={() => handleFollow(data.user.id)}
              />
            </>
          );
        })}
      </Container>
    </>
  );
};

export default UserFollowers;
