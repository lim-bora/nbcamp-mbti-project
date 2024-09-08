import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [newNickname, setNewNickname] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인해주세요.");
      navigate("/login");
    } else {
      const fetchUserInfo = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const { data } = await axios.get(
            "https://moneyfulpublicpolicy.co.kr/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserInfo(data);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchUserInfo();
    }
  }, [isAuthenticated, navigate]);

  const handleNicknameChange = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken"); // 로컬스토리지에 저장된 로그인한 유저 토큰 가져오기
      const formData = new FormData(); //FormData : 파일 업로드나 복잡한 데이터 구조 전송용
      formData.append("바꾼 닉네임", newNickname);
      console.log("바꾼 닉네임", newNickname);
      const { data } = await axios.patch(
        "https://moneyfulpublicpolicy.co.kr/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, //로그인한 유저의 토큰을 넣어 서버요청
            "Content-Type": "multipart/form-data", //formData를 서버전송시 해줘야하는 공식
          },
        }
      );

      if (data.success) {
        setUserInfo((prevState) => ({
          ...prevState,
          nickname: data.nickname, //새 닉네님 업데이트
        }));
        alert("닉네임이 변경되었습니다.");
        setNewNickname(""); //새 닉네임 적는칸 리셋
      } else {
        alert("닉네임 변경에 실패했습니다.");
      }
    } catch (error) {
      alert("닉네임 변경에 실패했습니다.");
    }
  };

  if (!userInfo) return <div>Loading...</div>; //userInfo가 없으면 Loading...출력

  return (
    <StProfileContainer className="Profile">
      <StProfileBox>
        <h3>MY PROFILE</h3>
        <div>
          <span>ID</span>
          <p>{userInfo.id}</p>
          <span>NICKNAME</span>
          <p>{userInfo.nickname}</p>
        </div>

        <form onSubmit={handleNicknameChange}>
          <span>닉네임을 변경하시겠습니까?</span>
          <input
            type="test"
            placeholder="새 닉네임"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
          <StButton type="submit">닉네임 변경</StButton>
        </form>
      </StProfileBox>
    </StProfileContainer>
  );
};

export default Profile;

const StProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #afe6c3;
  height: calc(100vh - 68px);
  width: 100%;
  margin: 0 auto;
`;
const StProfileBox = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 500px;
  height: 100%;
  max-height: 600px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 20px;
  justify-content: space-around;

  & h3 {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.5px;
  }

  & p {
    font-size: 17px;
    font-weight: 400;
    color: #222;
    letter-spacing: 1px;
    border-bottom: 1px solid #e9e9e9;
    padding: 20px 15px;
    margin-bottom: 20px;
  }
  & span {
    font-size: 15px;
    font-weight: 400;
    color: #ccc;
    letter-spacing: 1px;
  }

  & form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    & span {
      font-size: 15px;
      font-weight: 400;
      color: #ccc;
      letter-spacing: 1px;
    }
    & input {
      border-bottom: 1px solid #e9e9e9;
      padding: 20px 15px;
      font-size: 12px;

      &:focus {
        outline: 1px solid #afe6c3;
        background-color: #f6f6f6;
      }
    }
  }
`;

const StButton = styled.button`
  border-radius: 50px;
  background-color: #c2fbd7;
  box-shadow: rgba(25, 25, 25, 0.04) 0 0 1px 0, rgba(0, 0, 0, 0.1) 0 3px 4px 0;
  color: #008000;
  cursor: pointer;
  display: inline-block;
  font-size: 1em;
  height: 50px;
  padding: 0 25px;
  transition: all 200ms;

  &:hover {
    background-color: #afe6c3;
    transform: scale(1.05);
  }
`;
