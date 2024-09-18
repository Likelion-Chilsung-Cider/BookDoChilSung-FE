import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginMain.module.scss';

const LoginMain = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 카카오 JavaScript SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("KAKAO_API_KEY");  // JavaScript 키 넣어야 함
    }
    console.log(window.Kakao.isInitialized()); // SDK 초기화 여부 확인
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log("카카오 로그인 성공", authObj);

        // 로그인 성공 후 사용자 정보 요청
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            console.log("카카오 사용자 정보:", res);

            // 카카오 사용자 ID를 user_seq로 사용
            const userSeq = res.id;  // 카카오에서 제공하는 고유 사용자 ID

            // user_seq 및 카카오 토큰 저장
            localStorage.setItem('user_seq', userSeq);
            localStorage.setItem('kakao_token', authObj.access_token);

            console.log('user_seq 저장:', userSeq);

            // 로그인 성공 후 홈으로 리디렉션
            navigate('/');
          },
          fail: (err) => {
            console.error("사용자 정보 요청 실패:", err);
          }
        });
      },
      fail: (err) => {
        console.error("카카오 로그인 실패", err);
      },
    });
  };

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