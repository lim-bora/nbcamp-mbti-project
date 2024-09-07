import axios from "axios";
import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "https://moneyfulpublicpolicy.co.kr/login",
      {
        id,
        password,
      }
    );

    if (data.success) {
      //로그인 성공했을 때
      //로그인
      console.log("data", data);
      login(data.accessToken); //토큰 받아서 로그인
      setNickname(data.nickname);
      alert(`${data.nickname}님 환영합니다.`); //로그인 성공 메세지
      navigate("/"); //홈으로 이동
    } else {
      alert("로그인 실패");
    }
  };

  return (
    <div>
      <h2>LOGIN PAGE</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="ID를 입력하세요."
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          placeholder="PASSWORD를 입력하세요."
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
