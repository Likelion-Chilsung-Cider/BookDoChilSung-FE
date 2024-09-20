import React, { useState } from 'react';
import full_star from '../assets/svg/full_star.svg';
import empty_star from '../assets/svg/empty_star.svg';
import bookshelf_back from '../assets/svg/bookshelf_back.svg';
import BookInfo from '../components/BookInfo';
import BookNote from '../components/BookNote';
import BookPhoto from '../assets/svg/book_photo.png'
import '../assets/scss/bookshelf.scss';

const BookShelfDetail = () => {
  const [selectedTab, setSelectedTab] = useState('book'); // 기본값은 'book'
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [readingStatus, setReadingStatus] = useState(0);
  const [rating, setRating] = useState(0); // 별점 상태 관리, 0은 별이 선택되지 않은 상태

  const closeIconClick = () => {
    setIsPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  // 별점 클릭 시 상태를 업데이트하는 함수
  const handleStarClick = (index) => {
    setRating(index);
  };

  return (
    <div className='back'>
      <div className='top_bar_div'>
        <img src={bookshelf_back} alt="" />
        <p onClick={closeIconClick}>수정</p>
      </div>
      <p className='when'>2024.08.19 - 2024.8.20</p>
      <div className='star_div'>
        {/* 5개의 별을 반복적으로 렌더링 */}
        {[1, 2, 3, 4, 5].map((starId) => (
          <img
            key={starId}
            src={starId <= rating ? full_star : empty_star} // 클릭한 별 이하로는 full_star, 나머지는 empty_star
            alt=""
            id={starId.toString()}
            onClick={() => handleStarClick(starId)} // 해당 별 클릭 시 별점 상태 업데이트
          />
        ))}
      </div>
      <div className='cover_div'>
        <div className='bookcover'>
          <img src={BookPhoto} alt="" className='bookphoto'/>
        </div>
      </div>
      {/* 탭 버튼 */}
      <div className='book_info_top_div'>
        <div
          className={`main ${selectedTab === 'book' ? 'active' : ''}`}
          onClick={() => setSelectedTab('book')}
        >
          책 정보
        </div>
        <div
          className={`sub ${selectedTab === 'note' ? 'active' : ''}`}
          onClick={() => setSelectedTab('note')}
        >
          메모
        </div>
      </div>

      {/* 탭에 따른 내용 표시 */}
      {selectedTab === 'book' ? <BookInfo /> : <BookNote />}

      {isPopupVisible && (
        <div className='popup'>
          <div className='popupContent'>
            <button className='closeButton' onClick={handlePopupClose}>
              X
            </button>

            <h2>독서 상태</h2>
            <div className='statusButtons'>
              <button className={readingStatus === 0 ? 'active' : ''} onClick={() => setReadingStatus(0)}>읽을 책</button>
              <button className={readingStatus === 1 ? 'active' : ''} onClick={() => setReadingStatus(1)}>읽는 중</button>
              <button className={readingStatus === 2 ? 'active' : ''} onClick={() => setReadingStatus(2)}>읽은 책</button>
            </div>

            <h2>독서 기간</h2>
            <div className='datePicker'>
              <label>독서 시작</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className='datePicker'>
              <label>독서 종료</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>

            <button className='saveButton' onClick={handlePopupClose} >저장</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookShelfDetail;
