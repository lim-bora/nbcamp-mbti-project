const calculateMBTI = (answers, questions) => {
  const scores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  //Object.entries : answers 객체의 키-값 쌍을 배열 형태로 반환
  /*
    0: (2) ['0', '예']
    1: (2) ['1', '예']
    2: (2) ['2', '아니요']...
  */
  Object.entries(answers).forEach(([index, answer]) => {
    const question = questions[index];
    if (question.type === "E/I") {
      scores[answer === "예" ? "E" : "I"]++;
    } else if (question.type === "S/N") {
      scores[answer === "예" ? "S" : "N"]++;
    } else if (question.type === "T/F") {
      scores[answer === "예" ? "T" : "F"]++;
    } else if (question.type === "J/P") {
      scores[answer === "예" ? "J" : "P"]++;
    }
  });

  //위 결과값에 따라 MBTI결과값 반환
  const result = `${scores.E >= scores.I ? "E" : "I"}${
    scores.S >= scores.N ? "S" : "N"
  }${scores.T >= scores.F ? "T" : "F"}${scores.J >= scores.P ? "J" : "P"}`;

  return result;
};

export { calculateMBTI };
