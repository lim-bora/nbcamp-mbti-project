import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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
      <header className="flex justify-between items-center px-20">
        <h1>
          <Link to="/">Home</Link>
        </h1>
        <nav className="flex gap-4">
          {
            //로그인되어있으면 로그아웃 버튼 노출, 로그인 안되어있으면 로그인, 회원가입 버튼 노출
            isAuthenticated ? (
              <>
                <Link to="/profile">내 프로필</Link>
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
      </header>
    </div>
  );
};

export default Layout;
