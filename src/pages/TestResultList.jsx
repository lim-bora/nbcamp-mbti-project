import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ResultContext } from "../context/ResultContext";
import { getTestResults } from "../api/testResults";
import { mbtiDescriptions } from "../data/mbtiDescriptions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";

const TestResultList = () => {
  const { loginUser } = useContext(AuthContext);
  const { results } = useContext(ResultContext);

  const { data, isPending, isError } = useQuery({
    queryFn: getTestResults,
    queryKey: ["testResults"],
  });
  if (isPending) {
    return <div>로딩중..</div>;
  }
  if (isError) {
    return <div>오류입니다..</div>;
  }

  return (
    <div>
      {data.map((item, index) => {
        const mbtiDescEntry = Object.entries(mbtiDescriptions).find(
          ([key, value]) => key === item.result
        );
        const mbtiDesc = mbtiDescEntry[1];

        return (
          <StResultListItem key={index}>
            <div>{item.nickname}</div>
            <div>{new Date(item.date).toLocaleDateString()}</div>
            <div>{item.result}</div>
            <div>{mbtiDesc}</div>
          </StResultListItem>
        );
      })}
    </div>
  );
};

export default TestResultList;

const StResultListItem = styled.div`
  width: 100%;
  height: 150px;
  padding: 20px;
  border: 1px solid #111;
`;
/*
  1. 모든테스트 결과값들 전부 가져오기
  2. 리스트로 노출시키기 
  3. 로그인유저의 아이디와 같은 리스트만 버튼 보이게하기
  - 은 공개전환,삭제버튼 노출
*/
