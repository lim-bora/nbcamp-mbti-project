// import { useContext } from "react";
import TestForm from "../components/TestForm";
import styled from "styled-components";
// import { calculateMBTI } from "../utils/mbtiCalculator";
// import { createTestResult } from "../api/testResults";
// import { useNavigate } from "react-router-dom";
// import { questions } from "../data/questions";
// import { AuthContext } from "../context/AuthContext";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const TestPage = () => {
  // const { loginUser } = useContext(AuthContext);

  return (
    <StTestContainer>
      <StTestInnerBox>
        <StTitle>MBTI 테스트</StTitle>
        <TestForm></TestForm>
      </StTestInnerBox>
    </StTestContainer>
  );
};

export default TestPage;
const StTestContainer = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
`;
const StTestInnerBox = styled.div`
  width: 100%;
  max-width: 1000px;
  height: fit-content;
  box-shadow: rgba(25, 25, 25, 0.04) 0 0 1px 0, rgba(0, 0, 0, 0.1) 0 3px 4px 0;
  background-color: #fff;
  padding: 4rem 6rem;
  margin: 6rem;
`;
const StTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  padding: 20px 0;
  margin-bottom: 40px;
  border-bottom: 1px solid #e9e9e9;
`;
