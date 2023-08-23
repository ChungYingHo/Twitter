import styled from "styled-components";
import defaultUserBanner from "../../assets/defaultUserBanner.png";
import dummyUserPic from "../../assets/dummyUserPic.jpg";

const UserMainContainer = styled.div`
  width: 100%;
  height: 378px;
  position: relative;
`;

const UserBanner = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const UserInfoWrapper = styled.div`
  position: relative;
  top: -75px;
  padding: 0 16px;
`;

const UserPicBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserEditBtn = styled.button`
  width: 128px;
  height: 40px;
  border: 1px solid #ff6600;
  background-color: white;
  padding: 8px 16px;
  border-radius: 50px;
  color: #ff6600;
  font-size: 14px;
  position: relative;
  top: 85px;
`;

const UserPic = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid white;
`;

const UserAccountNameWrapper = styled.div`
  margin-top: 5px;
`;

const UserName = styled.h5`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 3px;
`;

const UserAccount = styled.p`
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 5px;
`;

const UserIntroduction = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  margin-bottom: 5px;
`;

const UserFollowWrapper = styled.div`
  display: flex;
`;

const UserFollowbox = styled.div`
  display: flex;
  margin-right: 20px;
`;

const UserFollowTittle = styled.p`
  color: #6c757d;
  font-size: 14px;
`;

const UserFollowNum = styled.p`
  color: #171725;
  font-size: 14px;
`;

const UserInfo = () => {
  return (
    <UserMainContainer>
      <UserBanner src={defaultUserBanner} />

      <UserInfoWrapper>
        <UserPicBtnWrapper>
          <UserPic src={dummyUserPic} />
          <UserEditBtn>編輯個人資料</UserEditBtn>
        </UserPicBtnWrapper>

        <UserAccountNameWrapper>
          <UserName>Egg Head</UserName>
          <UserAccount>@egghead123</UserAccount>

          <UserIntroduction>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint.
          </UserIntroduction>

          <UserFollowWrapper>
            <UserFollowbox>
              <UserFollowNum>34個</UserFollowNum>
              <UserFollowTittle>跟隨中</UserFollowTittle>
            </UserFollowbox>

            <UserFollowbox>
              <UserFollowNum>59位</UserFollowNum>
              <UserFollowTittle>跟隨者</UserFollowTittle>
            </UserFollowbox>
          </UserFollowWrapper>
        </UserAccountNameWrapper>
      </UserInfoWrapper>
    </UserMainContainer>
  );
};

export default UserInfo;
