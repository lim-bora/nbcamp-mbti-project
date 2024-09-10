import { useEffect, useContext } from "react";
import axios from "axios";
import TestResultList from "./TestResultList";
import { getTestResults } from "../api/testResults";
import { AuthContext } from "../context/AuthContext";
// import { ResultContext } from "../context/ResultContext";
// import { mbtiDescriptions } from "../data/mbtiDescriptions";
import { mbtiDescriptions } from "../data/mbtiDescriptions";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TestResultPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext); //로그인유저값
  // const { results, setResults } = useContext(ResultContext);

  //테스트 결과값들 전체 가져오기
  useEffect(() => {
    const fetchResults = async () => {
      const data = await getTestResults();
      console.log("data", data);
      // setResults(data);
    };
    fetchResults();
  }, [loginUser.id]); //로그인유저바뀔때 리랜더링

  //만약 결과값없으면 로딩중 처리
  if (!results || results.length === 0) return <p>로딩 중...</p>;

  //전체결과값 중 로그인유저의 데이터 필터링
  const myResult = results.filter((result) => {
    return result.userId === loginUser.id;
  });

  //로그인 유저데이터 데이터들 중 가장 최근꺼 저장
  const myLastResult = myResult[myResult.length - 1];
  console.log("mbtiDescriptions", mbtiDescriptions);
  //mbtiDescriptions가 객체라 키,키값 배열로 변경 후 key값 중 내 mbti와 같은것 찾기
  const myMbtiEntry = Object.entries(mbtiDescriptions).find(
    ([key, value]) => key === myLastResult.result
  );
  console.log("myMbtiEntry", myMbtiEntry);
  //데이터 객체화
  const myMbti = myMbtiEntry
    ? { mbti: myMbtiEntry[0], description: myMbtiEntry[1] }
    : null;
  console.log("myMbti", myMbti);
  return (
    <StTestResultContainer>
      <StTestResultCenterBox>
        <div>
          <h3>{`${loginUser.nickname}님의 테스트 결과`}</h3>
          <h2>{myLastResult.result}</h2>
          <p>{myMbti.description}</p>
        </div>

        <StButton onClick={() => navigate("/testResultList")}>
          결과 페이지로 이동
        </StButton>
      </StTestResultCenterBox>
    </StTestResultContainer>
  );
};

export default TestResultPage;
const StTestResultContainer = styled.div`
  background-color: #afe6c3;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding-top: 10rem;
`;
const StTestResultCenterBox = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 500px;
  background-color: #fff;
  padding: 6rem;
  border-radius: 15px;
  box-shadow: rgba(25, 25, 25, 0.04) 0 0 1px 0, rgba(0, 0, 0, 0.1) 0 3px 4px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  & > div {
    text-align: center;
  }
  & h3 {
    font-size: 2rem;
    font-weight: 600;
  }
  & h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #efcc32;
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
