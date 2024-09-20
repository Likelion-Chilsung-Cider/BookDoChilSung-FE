import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginMain.module.scss';

const LoginMain = () => {
  const navigate = useNavigate();

  // 카카오 OAuth 리디렉션 URL
  const kakaoOAuthUrl = 'https://bookdochilsung.site/oauth2/authorization/kakao';

  // 카카오 로그인 버튼 클릭 핸들러
  const handleKakaoLogin = () => {
    window.location.href = kakaoOAuthUrl; // 사용자를 카카오 OAuth 페이지로 리디렉션
  };

  useEffect(() => {
    // URL에서 'code' 쿼리 파라미터 체크
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      console.log("카카오 로그인 성공. 코드: ", code);

      // 서버에 POST 요청으로 코드 전달 및 토큰 요청
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}) // 서버에 코드 전송
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("서버 응답: ", data);

        // 로그인 토큰 localStorage에 저장
        localStorage.setItem('token', data.access_token);

        // 홈 화면으로 리디렉션
        navigate('/');
      })
      .catch((error) => {
        console.error("로그인 요청 중 에러 발생: ", error);
      });
    }
  }, []);

  return (
    <div 
      className={styles.loginMain} 
      style={{ 
        backgroundImage: `url('/assets/images/splash.png')`,  // scss에서는 경로 설정 오류로 인라인 스타일로 배경 이미지 설정
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        height: '100vh' 
      }}
    >
      <button className={styles.kakaoButton} onClick={handleKakaoLogin}>
        <img src="/assets/icons/kakao.png" alt="카카오 아이콘" className={styles.kakaoIcon} />
        카카오 계정으로 계속하기
      </button>
    </div>
  );
};

export default LoginMain;