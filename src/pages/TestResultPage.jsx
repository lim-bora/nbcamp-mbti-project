import { useEffect, useContext } from "react";
import axios from "axios";
import TestResultList from "./TestResultList";
import { getTestResults } from "../api/testResults";
import { AuthContext } from "../context/AuthContext";
import { ResultContext } from "../context/ResultContext";
import { mbtiDescriptions } from "../data/mbtiDescriptions";
import { useNavigate } from "react-router-dom";

const TestResultPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext); //로그인유저값
  const { results, setResults } = useContext(ResultContext);

  useEffect(() => {});

  //테스트 결과값들 전체 가져오기
  useEffect(() => {
    const fetchResults = async () => {
      const data = await getTestResults();
      setResults(data);
    };
    fetchResults();
  }, [loginUser.id]); //로그인유저바뀔때 리랜더링

  console.log("results", results);
  //만약 결과값없으면 로딩중 처리
  if (!results || results.length === 0) return <p>로딩 중...</p>;

  //전체결과값 중 로그인유저의 데이터 필터링
  const myResult = results.filter((result) => {
    return result.userId === loginUser.id;
  });

  //로그인 유저데이터 들 중 가장 최근꺼 저장
  const myLastResult = myResult[myResult.length - 1];

  //mbtiDescriptions가 객체라 키,키값 배열로 변경 후 key값 중 내 mbti와 같은것 찾기
  const myMbtiEntry = Object.entries(mbtiDescriptions).find(
    ([key, value]) => key === myLastResult.result
  );

  //데이터 객체화
  const myMbti = myMbtiEntry
    ? { mbti: myMbtiEntry[0], description: myMbtiEntry[1] }
    : null;

  return (
    <div>
      <h4>{`${loginUser.nickname}님의 테스트 결과`}</h4>
      <h2>{myLastResult.result}</h2>
      <p>{myMbti.description}</p>
      <button onClick={() => navigate("/testResultList")}>
        결과 페이지로 이동
      </button>
    </div>
  );
};

export default TestResultPage;
