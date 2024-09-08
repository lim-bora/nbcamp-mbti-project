import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    <StSignUpContainer className="Signup pageCm">
      <StSignUpBox>
        <StSignUpLeft>
          <h2>
            Welcome
            <br />
            MBTI!
          </h2>
        </StSignUpLeft>

        <StSignUpRight onSubmit={handleSubmit}>
          <h3>SIGN UP</h3>
          <p>Are you curious about MBTI?</p>
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
          <StButton type="submit">Sign Up</StButton>
        </StSignUpRight>
      </StSignUpBox>
    </StSignUpContainer>
  );
};

export default Signup;

const StSignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StSignUpBox = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  max-height: 600px;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  display: flex;
`;
const StSignUpLeft = styled.div`
  width: 50%;
  background-color: #afe6c3;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 40px;

  & h2 {
    font-size: 3.5rem;
    color: #fff;
    font-weight: bold;
  }
`;
const StSignUpRight = styled.form`
  width: 50%;
  padding: 40px;
  display: flex;
  flex-direction: column;
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
