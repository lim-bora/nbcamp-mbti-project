import React from "react";
import { questions } from "../data/questions";
import { useState, useContext } from "react";
import { ResultContext } from "../context/ResultContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const TestForm = ({ onSubmit }) => {
  const { results } = useContext(ResultContext);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers); //테스트 제출 함수 호출 (인자로 답 전달)
    const newResultObj = { title: results };
    mutate(newResultObj);
  };

  const handleChange = (index, optionCheck) => {
    setAnswers({
      ...answers,
      [index]: optionCheck,
    });
  };
  // console.log("answers", answers);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {questions.map((qa, index) => (
          <div key={qa.id}>
            <p>
              <span>{`Q.${index + 1}번`}</span>
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
          </div>
        ))}
        <button type="submit">제출하기</button>
      </form>
    </div>
  );
};

export default TestForm;
