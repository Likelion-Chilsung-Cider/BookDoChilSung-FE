import React, { useEffect, useState } from 'react';
import bookshelf_back from '../assets/svg/bookshelf_back.svg'
import '../assets/scss/mypage.scss'
import apiClient from '../apiClient';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

export default function MyPage() {
  const [userData, setUserData] = useState({
    nickname: '칠성사이다',
    profileImg: '',
    date: '100',
    bookcount: []
  });
  const [values, setValues] = useState([5, 4, 2, 6, 3]);
  const [newNickname, setNewNickname] = useState(''); // 입력된 새로운 닉네임 상태
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태


  useEffect(() => {
    const fetchMyPageData = async () => {
      // localStorage에서 카카오 토큰 가져오기
      const token = localStorage.getItem('kakao_token');
      if (!token) {
        console.error("토큰이 저장되어 있지 않습니다.");
        return;
      }

      try {
        const response = await apiClient.get('/api/mypage', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data.data); // API 응답에서 데이터 추출
        setValues([...response.data.data.bookcount].reverse())
        //setValues([5, 4, 2, 6, 3]);// 가정된 value 데이터, API 응답 데이터로 교체 필요

      } catch (error) {
        console.error('API 호출 중 에러 발생:', error);
      }
    };

    fetchMyPageData();
  }, []);
  const handleNicknameChange = (event) => {
    setUserData({ ...userData, nickname: event.target.value });
  };


  const updateNickname = async () => {
    const payload = {
      nickname: newNickname
    };

    try {
      const response = await apiClient.post('/api/mypage/nickname', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.data.status === "success") {
        alert('닉네임이 변경되었습니다.');
        setUserData({ ...userData, nickname: newNickname }); // 상태 업데이트
      } else {
        alert(response.data.message); // 서버 에러 메시지 표시
      }
    } catch (error) {
      console.error('닉네임 변경 실패:', error);
      alert('닉네임이 변경되었습니다.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 선택한 이미지 파일 저장
    if (file) {
      setImageFile(file);  // 이미지 파일 상태 업데이트
      uploadImage(file);   // 바로 이미지 업로드 함수 호출
    }
  };

  const uploadImage = async (file) => {
    if (!imageFile) {
      alert('이미지 파일이 선택되지 않았습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('profileImg', imageFile);

    try {
      const response = await apiClient.post('/api/mypage/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // 필요에 따라 헤더 설정
        }
      });
      alert('이미지가 업로드 되었습니다!');
      setUserData({ ...userData, profileImg: response.data.data.profileImg }); // 응답 받은 이미지 URL로 업데이트
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  const renderBarChart = () => {
    const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const data = values.map((value, index) => ({
      name: months[(currentMonth - 4 + index + 12) % 12], // 월 계산
      value
    }));
    console.log(data);

    return (
      <ResponsiveContainer width="100%" height={233}>
        <BarChart data={data} layout="horizontal" margin={{ top: 15, right: 20, bottom: 5, left: 20 }}>
          <XAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
          <YAxis type="number" hide={true} />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" barSize={20} radius={50}>
            {/* 각 바에 값 표시 추가 */}
            <LabelList dataKey="value" position="top" style={{ fill: 'black' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };



  return (
    <div className='back'>
      <div className='top_bar_div'>
        <img src={bookshelf_back} alt="" />
      </div>
      <div className='info_div'>
        <input type="text" className='name' value={userData.nickname} onChange={handleNicknameChange} />
        <div className='fix' onClick={updateNickname} >수정</div>
        <div className='picture'>
          {/* 조건부 렌더링을 사용하여 프로필 이미지가 있을 경우에만 이미지 표시 */}
          {userData.profileImg && <img src={userData.profileImg} alt="Profile" />}
        </div>
        <div className='change' onClick={() => document.getElementById('fileInput').click()}>사진변경
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <p className='txt'>북도칠성과 독서한지</p>
        <p className='date'>{`"${userData.date}일"`}</p>
      </div>

      <p className='title'>월별 독서량</p>
      <div className='month_div'>
        {renderBarChart()}
      </div>
    </div>
  );
}
