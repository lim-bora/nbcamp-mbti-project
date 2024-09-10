import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:4000/testResults";

// 데이터 가져오는 함수 (queryFn)
export const getTestResults = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

//추가함수 (mutationFn) : 새로운 데이터 추가하는 함수
export const createTestResult = async (resultData) => {
  await axios.post(API_URL, resultData);
};

export const deleteTestResult = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateTestResultVisibility = async ({ id, visibility }) => {
  await axios.patch(`${API_URL}/${id}`, {
    visibility,
  });
};

//긴코드 변수로
//함수가 한가지동작.? -> 한 함수에 두가지일하면 분리
