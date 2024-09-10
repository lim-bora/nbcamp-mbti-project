import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
// import { ResultContext } from "../context/ResultContext";
import {
  getTestResults,
  deleteTestResult,
  updateTestResultVisibility,
} from "../api/testResults";
import { mbtiDescriptions } from "../data/mbtiDescriptions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { useState } from "react";

const TestResultList = () => {
  const queryClient = useQueryClient();
  const { loginUser } = useContext(AuthContext);
  console.log("loginUser", loginUser);
  const { data, isPending, isError } = useQuery({
    queryFn: getTestResults,
    queryKey: ["testResults"],
    refetchOnWindowFocus: true, //다른 창에서 돌아올 때 재요청
    staleTime: 0, // 데이터를 언제까지 '신선'하다고 볼지, 0이면 항상 refetch
  });

  //useQuery는 c/u/d 하는 페이지에 각각 꼭 넣기
  const patchMutation = useMutation({
    mutationFn: updateTestResultVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
    },
  });

  const handleToggleVisibility = async (id, visibility) => {
    // !visibility
    data.forEach((resultData) => {
      resultData.visibility = !resultData.visibility;
    });
    patchMutation.mutate({ id, visibility: !visibility }); //mutate 인자 ㅎㅏ나
  };

  //삭제클릭햇을때 전체데이터에서 클릭한거 삭제하기
  const deleteMutation = useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
    },
  });

  const handleDelete = async (id) => {
    deleteMutation.mutate(id);
  };

  if (isPending) {
    return <div>로딩중..</div>;
  }
  if (isError) {
    return <div>오류입니다..</div>;
  }
  //if return은 무조건 아래에 넣기

  // console.log("data", data);
  return (
    <StResultContainer>
      {data
        .filter(
          (item) =>
            item.visibility ||
            (!item.visibility && loginUser && loginUser.id === item.userId)
        )
        .map((item, index) => {
          const mbtiDescEntry = Object.entries(mbtiDescriptions).find(
            ([key, value]) => key === item.result
          );
          const mbtiDesc = mbtiDescEntry[1];

          return (
            <StResultListItem key={index}>
              <StResultListTop>
                <h3>{item.nickname}</h3>
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </StResultListTop>
              <h2>{item.result}</h2>
              <p>{mbtiDesc}</p>
              {/*버튼 : 로그인한 사람만 보여야함*/}
              {loginUser && loginUser.id === item.userId && (
                <StResultListBottom>
                  <StButton
                    onClick={() =>
                      handleToggleVisibility(item.id, item.visibility)
                    }
                  >
                    {item.visibility ? "비공개로 전환" : "공개로 전환"}
                  </StButton>
                  <StDeleteButton onClick={() => handleDelete(item.id)}>
                    삭제
                  </StDeleteButton>
                </StResultListBottom>
              )}
            </StResultListItem>
          );
        })}
    </StResultContainer>
  );
};

export default TestResultList;
const StResultContainer = styled.div`
  background-color: #afe6c3;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding-top: 10rem;
`;
const StResultListItem = styled.div`
  width: 100%;
  max-width: 500px;
  height: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: rgba(25, 25, 25, 0.04) 0 0 1px 0, rgba(0, 0, 0, 0.1) 0 3px 4px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & h2 {
    font-size: 20px;
    font-weight: 700;
    color: #efcc32;
  }
`;
const StResultListTop = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e9e9e9;
  padding: 0px 0 10px;

  & h3 {
    font-size: 18px;
    font-weight: 600;
  }
  & span {
    font-size: 15px;
    font-weight: 400;
    color: #b4b4b4;
  }
`;
const StResultListBottom = styled.div`
  display: flex;
  gap: 10px;
  justify-content: end;
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

const StDeleteButton = styled.button`
  border-radius: 50px;
  background-color: #dddddd;
  box-shadow: rgba(25, 25, 25, 0.04) 0 0 1px 0, rgba(0, 0, 0, 0.1) 0 3px 4px 0;
  color: #606060;
  cursor: pointer;
  display: inline-block;
  font-size: 1em;
  height: 50px;
  padding: 0 25px;
  transition: all 200ms;

  &:hover {
    background-color: #c0c0c0;
    transform: scale(1.05);
  }
`;
