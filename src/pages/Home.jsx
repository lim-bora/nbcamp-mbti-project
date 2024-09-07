import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // 로그인되어있는지 아닌지 확인후 페이지 리다이렉트
  const handleClick = () => {
    const token = localStorage.getItem("accessToken"); // 로컬스토리지에 저장된 토큰을 가져오기
    if (!token) {
      //로그인 안되어있으면
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      //로그인 되어있으면
      navigate("/testPage");
    }
  };

  return (
    <div>
      <h2>Main Page</h2>
      <button onClick={handleClick}>
        {localStorage.getItem("accessToken") ? "테스트 시작" : "로그인"}
      </button>
    </div>
  );
};

export default Home;

//로그인되어있으면 테스트 시작
//로그인안되어있으면 로그인
