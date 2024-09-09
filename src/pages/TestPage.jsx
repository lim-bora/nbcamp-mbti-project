import { useContext } from "react";
import TestForm from "../components/TestForm";
import styled from "styled-components";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import { AuthContext } from "../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const TestPage = () => {
  const queryClient = useQueryClient();
  const { loginUser } = useContext(AuthContext);
  console.log("loginUser", loginUser);
  const Navigate = useNavigate();

  //테스트 제출 함수
  const handleTestSubmit = async (answers) => {
    //답을 인자로 전달해서 계산함수 실행 후 답 result변수에 담기
    const result = calculateMBTI(answers, questions);
    console.log("result", result);

    const resultData = {
      //결과 객체
      userId: loginUser.id,
      nickname: loginUser.nickname,
      result,
      answers,
      date: new Date().toISOString(),
      visibility: true,
    };
    await createTestResult(resultData); //axios추가함수호출 : 결과값객체 전달
    Navigate("/testResult"); //테스트 결과로 이동
  };

  const { mutate } = useMutation({
    mutationFn: createTestResult, //createTestResult 함수를 mutationFn으로 전달
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
    },
  });

  return (
    <div>
      <h1>MBTI 테스트</h1>
      <TestForm onSubmit={handleTestSubmit}></TestForm>
    </div>
  );
};

export default TestPage;
