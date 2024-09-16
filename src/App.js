import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import NavBar from './components/header/NavBar';

const WrapApp = styled.div`
  max-width: 430px;
  margin: auto;
  @media (min-width: 431px) {
    border-left: 0.5px solid #eee;
    border-right: 0.5px solid #eee;
  }
`;

function App() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   setNavigate(navigate);
  // }, [navigate]);

  useEffect(() => {
    // localStorage나 sessionStorage에서 로그인 상태를 확인
    const token = localStorage.getItem('token');
    if (!token) {
      // 토큰이 없으면 로그인 페이지로 리디렉션
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <WrapApp>
        <Outlet />
        <NavBar />
      </WrapApp>
    </>
  );
}

export default App;