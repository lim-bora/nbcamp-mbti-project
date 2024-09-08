import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    <StHomeContainer className="Home pageCm">
      <StTitle>MBTI 테스트</StTitle>
      <p className="text-center">
        자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
      </p>
      <StNavBox>
        <li>
          <h4>MBTI 테스트</h4>
          <p>자신의 MBTI를 파악해보세요.</p>
        </li>
        <li>
          <h4>MBTI 이해하기</h4>
          <p>
            다른 사람들이 어떻게 행동하는지 이해하는데 도움을 줄 수 있습니다.
          </p>
        </li>
        <li>
          <h4>다른사람의 MBTI는?</h4>
          <p>다른사람들의 MBTI도 구경해보세요.</p>
        </li>
      </StNavBox>
      <StMainButton onClick={handleClick}>
        {localStorage.getItem("accessToken") ? "테스트 시작" : "로그인"}
      </StMainButton>
    </StHomeContainer>
  );
};

export default Home;

const StHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding-top: 5rem;
`;
const StTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
`;
const StMainButton = styled.button`
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
const StNavBox = styled.ul`
  display: flex;
  gap: 3rem;
  width: 100%;
  max-width: 1300px;
  height: 200px;

  & li {
    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
      rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
    width: calc(100% / 3);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 1rem;
    cursor: pointer;
    padding: 20px;

    &:hover {
      box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
        rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    }

    & h4 {
      font-size: 18px;
      font-weight: 600;
    }
    & p {
      font-size: 13px;
      color: #777;
      font-weight: 400;
    }
  }
`;
