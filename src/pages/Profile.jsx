import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div>
      <h2>내 프로필</h2>
      <p>ID : {userInfo.id}</p>
      <p>닉네임 : {userInfo.nickname}</p>

      <form onSubmit={handleNicknameChange}>
        <input
          type="test"
          placeholder="새 닉네임"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
        />
        <button type="submit">닉네임 변경</button>
      </form>
    </div>
  );
};

export default Profile;
