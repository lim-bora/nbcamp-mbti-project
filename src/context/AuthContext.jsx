import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

const token = localStorage.getItem("accessToken"); // 로컬스토리지에 저장된 토큰을 가져오기

export const AuthProvider = ({ children }) => {
  //초기에 로그인 되어있는지 확인
  const storedUser = JSON.parse(localStorage.getItem("loginUser")); // 로컬스토리지에 저장된 사용자 정보 가져오기
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); // !!token : token이 있으면 true, 없으면 false
  const [loginUser, setLoginUser] = useState(storedUser);
  // console.log("storedUser", storedUser);

  //로그인
  const login = (token, userInfo) => {
    localStorage.setItem("accessToken", token); //로컬스토리지에 토큰 저장
    localStorage.setItem("loginUser", JSON.stringify(userInfo)); //로컬스토리지에 로그인정보 저장
    setIsAuthenticated(true); //로그인 상태로 변경
  };

  //로그아웃
  const logout = () => {
    localStorage.removeItem("accessToken"); //로컬스토리지에 토큰 삭제
    localStorage.removeItem("loginUser"); //로컬스토리지에 로그인정보 삭제
    setIsAuthenticated(false); //로그아웃 상태로 변경
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loginUser,
        setLoginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
