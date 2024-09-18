import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoLoginAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 카카오 로그인 상태 확인
    if (window.Kakao) {
      window.Kakao.Auth.getStatusInfo(({ status }) => {
        if (status === 'connected') {
          // 로그인 성공 시 사용자 정보 요청
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: (res) => {
              const token = window.Kakao.Auth.getAccessToken();
              console.log("카카오 로그인 성공. 토큰: ", token);
              
              // 백엔드에 POST 요청으로 토큰 전달
              fetch('/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  access_token: token,
                }),
              })
              .then((response) => response.json())
              .then((data) => {
                console.log("서버 응답: ", data);
                
                // 로그인 토큰 localStorage에 저장
                localStorage.setItem('token', data.access_token); 
                
                // 홈 화면으로 리디렉션 전에 console로 확인
                console.log('홈으로 리디렉션');
                navigate('/');
              })
              .catch((error) => {
                console.error("로그인 요청 중 에러 발생: ", error);
              });
            },
            fail: (error) => {
              console.error("사용자 정보 요청 실패: ", error);
            },
          });
        } else {
          console.error('카카오 로그인이 되어있지 않습니다.');
        }
      });
    }
  }, [navigate]);

  return <div>카카오 로그인 중</div>;
};

export default KakaoLoginAuth;