import { useState, createContext } from "react";

export const AuthContext = createContext();

const token = localStorage.getItem("accessToken"); // 로컬스토리지에 저장된 토큰을 가져오기

export const AuthProvider = ({ children }) => {
  //초기에 로그인 되어있는지 확인
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); // !!token : token이 있으면 true, 없으면 false

  //로그인
  const login = (token) => {
    localStorage.setItem("accessToken", token); //로컬스토리지에 토큰 저장
    setIsAuthenticated(true); //로그인 상태로 변경
  };

  //로그아웃
  const logout = () => {
    localStorage.removeItem("accessToken"); //로컬스토리지에 토큰 삭제
    setIsAuthenticated(false); //로그아웃 상태로 변경
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
