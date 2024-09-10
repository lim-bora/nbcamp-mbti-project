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
  // const { loginUser } = useContext(AuthContext);

  return (
    <div>
      <h1>MBTI 테스트</h1>
      <TestForm></TestForm>
    </div>
  );
};

export default TestPage;
