import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id,
          password,
          nickname,
        }
      );
      if (data.success) {
        alert(`${nickname}님 환영합니다. 로그인으로 이동합니다.`);
        navigate("/login");
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      if (error.response.status === 409) {
        // error.response.status : 응답코드
        alert("이미 존재하는 ID입니다.");
      } else {
        alert("회원가입 실패");
      }
    }
  };

  return (
    <div>
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={id}
          placeholder="ID를 입력하세요."
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="Password를 입력하세요."
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          value={nickname}
          placeholder="닉네임을 입력하세요."
          onChange={(e) => setNickname(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
