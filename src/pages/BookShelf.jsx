import React, { useState } from 'react';
import bookshelf_back from '../assets/svg/bookshelf_back.svg'
import full_star from '../assets/svg/full_star.svg'
import '../assets/scss/bookshelf.scss'
import BookInfo from '../components/BookInfo';
import BookNote from '../components/BookNote';


export default function BookShelf() {
  const [selectedTab, setSelectedTab] = useState('book'); // 기본값은 'book'
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const closeIconClick = () => {
    setIsPopupVisible(true);
  }
  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };
  return (
    <div className='back'>
      <div className='top_bar_div'>
        <img src={bookshelf_back} alt="" />
        <p onClick={closeIconClick}>수정</p>
      </div>
      <p className='when'>2024.08.19 - 2024.8.20</p>
      <div className='star_div'>
        <img src={full_star} alt="" id='1' />
        <img src={full_star} alt="" id='2' />
        <img src={full_star} alt="" id='3' />
        <img src={full_star} alt="" id='4' />
        <img src={full_star} alt="" id='5' />
      </div>
      <div className='cover_div'>
        <div className='bookcover'></div>
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
            <button className='closeButton' onClick={handlePopupClose} >X</button>

            <h2>독서 상태</h2>
            <div className='statusButtons'>
              <button className='active' >읽을 책</button>
              <button className='active' >읽는 중</button>
              <button className='active' >읽은 책</button>
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

            <button className='saveButton'>저장</button>
          </div>
        </div>)}

    </div>)
}
