import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

import { House, User } from "lucide-react";

const Layout = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useContext(AuthContext);

  //로그아웃 실행함수
  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?"); //window.confirm : 확인창 띄우기
    if (confirmLogout) {
      // 확인 눌렀을 때
      logout(); //로그아웃 실행
      navigate("/"); //홈으로 이동
    }
  };

  return (
    <div>
      <StHeader>
        <h1>
          <Link to="/">
            <House />
          </Link>
        </h1>
        <nav className="flex gap-4">
          {
            //로그인되어있으면 로그아웃 버튼 노출, 로그인 안되어있으면 로그인, 회원가입 버튼 노출
            isAuthenticated ? (
              <>
                <Link to="/profile">
                  <User />
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )
          }
        </nav>
      </StHeader>
    </div>
  );
};

export default Layout;

const StHeader = styled.header`
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: 20px;
`;
