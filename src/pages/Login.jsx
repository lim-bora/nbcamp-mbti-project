import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const navigate = useNavigate();
  const { login, setLoginUser } = useContext(AuthContext);

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
    console.log("data", data);
    if (data.success) {
      const userInfo = { id: data.userId, nickname: data.nickname };
      setLoginUser(userInfo); //리랜더링문제
      // console.log("userInfo", userInfo);
      login(data.accessToken, userInfo); //로그인토큰,유저정보 인자로 전달하여 로그인 함수실행
      setNickname(data.nickname);
      alert(`${data.nickname}님 환영합니다.`); //로그인 성공 메세지
      navigate("/"); //홈으로 이동
    } else {
      alert("로그인 실패");
    }
  };

  return (
    <StLoginContainer className="Login">
      <StLoginBox>
        <h3>LOGIN</h3>
        <p>Are you curious about MBTI?</p>
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
          <StButton type="submit">Login</StButton>
        </form>
      </StLoginBox>
    </StLoginContainer>
  );
};

export default Login;

const StLoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #afe6c3;
  height: calc(100vh - 68px);
  width: 100%;
  margin: 0 auto;
`;
const StLoginBox = styled.div`
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

  & h3 {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.5px;
  }

  & p {
    font-size: 15px;
    font-weight: 400;
    color: #ccc;
    letter-spacing: 1px;
  }

  & form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    & input {
      border: 1px solid #e9e9e9;
      padding: 20px 15px;
      border-radius: 50px;
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
