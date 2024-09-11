import React from "react";
import styled from "styled-components";
import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createTestResult } from "../api/testResults";
import { questions } from "../data/questions";
import { AuthContext } from "../context/AuthContext";
import { calculateMBTI } from "../utils/mbtiCalculator";

const TestForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { loginUser } = useContext(AuthContext);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  //4번 테스트 제출 함수
  const handleTestSubmit = async (answers) => {
    //답을 인자로 전달해서 계산함수 실행 후 답 result변수에 담기
    const result = calculateMBTI(answers, questions);

    const resultData = {
      //결과 객체
      userId: loginUser.id,
      nickname: loginUser.nickname,
      result,
      answers,
      date: new Date().toISOString(),
      visibility: true,
    };
    return resultData; //5번
  };

  //3번 onSubmit누르면실행됨
  const handleSubmit = async (e) => {
    e.preventDefault();
    //5번                     4번
    const result = await handleTestSubmit(answers); //테스트 제출 함수 호출 (인자로 답 전달)
    console.log("resultData", result);
    //6번
    createMutation.mutate(result);
  };
  //6-1
  const createMutation = useMutation({
    mutationFn: createTestResult, //createTestResult 함수를 mutationFn으로 전달
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
      navigate("/testResult"); //테스트 결과로 이동
    },
  });

  const handleChange = (index, optionCheck) => {
    setAnswers({
      ...answers,
      [index]: optionCheck,
    });
  };

  return (
    <div>
      {/* 2번 */}
      <form onSubmit={handleSubmit}>
        {questions.map((qa, index) => (
          <StTestItem key={qa.id}>
            <p>
              <span>{`Q.${index + 1} `}</span>
              {qa.question}
            </p>
            {qa.options.map((option, optionIndex) => {
              return (
                <label key={optionIndex} name={`Q_${index + 1}`}>
                  <input
                    type="radio"
                    name={`Q_${index}`}
                    value={option}
                    checked={answers[index] === option}
                    // // answers의 n번째 값이 option과 같으면 체크 => true = checked
                    onChange={() => handleChange(index, option)}
                  />
                  {option}
                </label>
              );
            })}
          </StTestItem>
        ))}
        {/* 1번 */}
        <StButton type="submit">제출하기</StButton>
      </form>
    </div>
  );
};

export default TestForm;
const StTestItem = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1px solid #e9e9e9;

  & p {
    & span {
      padding-right: 10px;
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
  margin: 30px auto;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #afe6c3;
    transform: scale(1.05);
  }
`;
