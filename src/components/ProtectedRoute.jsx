import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import TestResultList from "../pages/TestResultList";
import TestResultPage from "../pages/TestResultPage";
import TestPage from "../pages/TestPage";
import Signup from "../pages/Signup";

//PrivateRoute : 로그인이 필요한 페이지에 접근할 수 있도록 하는 컴포넌트
// 로그인이 되어있지 않은 사용자는 로그인 페이지로 리다이렉트
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

//PublicRoute : 로그인이 필요없는 페이지에 접근할 수 있도록 하는 컴포넌트
// 로그인이 되어있는 사용자는 프로필로 리다이렉트
const PublicRoute = ({ children }) => {
  //element와 기타 나머지 속성(...rest)을 인자로 받음
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? children : <Navigate to="/profile" />;
};

const ProtectedRoute = () => {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        {/* 전체접근가능 */}
        <Route path="/" element={<Home />} />

        {/* 로그인 안한 사람만 접근가능 */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* 로그인 한 사람만 접근가능 */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/testPage"
          element={
            <PrivateRoute>
              <TestPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/testResult"
          element={
            <PrivateRoute>
              <TestResultPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/testResultList"
          element={
            <PrivateRoute>
              <TestResultList />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default ProtectedRoute;
