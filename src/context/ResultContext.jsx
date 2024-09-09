import { createContext, useState } from "react";

export const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [results, setResults] = useState([]); //결과값 상태
  return (
    <ResultContext.Provider
      value={{
        results,
        setResults,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export default ResultProvider;
