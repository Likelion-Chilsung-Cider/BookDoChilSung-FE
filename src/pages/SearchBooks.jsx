import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBooks.module.scss';

const SearchBooks = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); 
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [readingStatus, setReadingStatus] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const token = localStorage.getItem('kakao_token');
  if (!token) {
    alert("로그인이 필요합니다.");
    navigate('/login');  // 로그인이 안 되어 있으면 로그인 페이지로 리디렉션
  }
  


  // 책 클릭 시 팝업 열기
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowPopup(true); // 팝업 열기
  };
  
  // API 요청
  const fetchBooks = async (query) => {
    setIsSearching(true); // 검색 시작
    try {
      const token = localStorage.getItem('kakao_token');  // kakao_token 가져옴
      console.log("토큰 확인: ", token);  // 토큰이 제대로 출력되는지 확인

      if (!token) {
        throw new Error("로그인 토큰이 없습니다. 로그인해주세요.");
      }

      const response = await fetch(`http://localhost:8080/api/book/searchBook?title=${query}&startPage=1&maxResults=50`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // JWT 토큰을 헤더에 포함
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.data && data.data.item) {
        setSearchResults(data.data.item); // 검색 결과 저장
      } else {
        setSearchResults([]); // 결과가 없을 경우 빈 배열로 설정
      }
    } catch (error) {
      console.error('책 정보 검색 중 오류 발생:', error);
    } finally {
      setIsSearching(false); // 검색 완료
    }
  };


const handleSaveReadingStatus = async () => {
  const token = localStorage.getItem('kakao_token');  // 토큰 가져오기
  if (!token) {
    alert("로그인이 필요합니다.");
    navigate('/login');  // 로그인 페이지로 리디렉션
    return;
  }

  // 선택한 책의 정보를 payload에 포함시킴
  const readingStatusPayload = {
    reading_seq: selectedBook.isbn,
    reading_status: readingStatus,
    title: selectedBook.title,
    description: selectedBook.description,
    publisher: selectedBook.publisher,
    author: selectedBook.author,
    isbn: selectedBook.isbn,
    pages: selectedBook.pages || 0,
    book_cover: selectedBook.cover,
    start_date: startDate,
    end_date: endDate
  };

  // 책 정보를 localStorage에 저장
  const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
  savedBooks.push(readingStatusPayload);
  localStorage.setItem('savedBooks', JSON.stringify(savedBooks));

  try {
    const response = await fetch('http://localhost:8080/api/readingStatus/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(readingStatusPayload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('독서 상태 저장 완료:', data);
    alert('독서 상태가 저장되었습니다.');
    setShowPopup(false);  // 저장 후 팝업 닫기
  } catch (error) {
    console.error('독서 상태 저장 중 오류 발생:', error);
  }
};


  // 검색어 입력 변경 처리
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 엔터키 누르면 검색
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      fetchBooks(searchQuery);  // API 요청
    }
  };

  return (
    <div className={styles.searchBooks}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBackClick}>
          <img src="/assets/icons/arrow.png" alt="뒤로가기" className={styles.icon} /> 
        </button>
        <div className={styles.searchBar}>
          <img src="/assets/icons/c_search.png" alt="검색" className={styles.icon} />
          <input 
            type="text" 
            value={searchQuery} 
            onChange={handleInputChange} 
            onKeyPress={handleKeyPress} 
          />
        </div>
      </div>

      {isSearching ? (
        <p>검색 중...</p>
      ) : (
        <div className={styles.results}>
          {searchResults.length > 0 ? (
            searchResults.map((book, index) => (
              <div key={index} className={styles.bookItem} onClick={() => handleBookClick(book)}>
                <img src={book.cover} alt={book.title} className={styles.bookCover} />
                <div className={styles.bookDetails}>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              </div>
            ))
          ) : (
            <p>검색어를 입력하세요</p>
          )}
        </div>
      )}

     {/* 팝업창 */}
      {showPopup && selectedBook && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={() => setShowPopup(false)}>X</button>
            
            <h2>독서 상태</h2>
            <div className={styles.statusButtons}>
              <button className={readingStatus === 0 ? styles.active : ''} onClick={() => setReadingStatus(0)}>읽을 책</button>
              <button className={readingStatus === 1 ? styles.active : ''} onClick={() => setReadingStatus(1)}>읽는 중</button>
              <button className={readingStatus === 2 ? styles.active : ''} onClick={() => setReadingStatus(2)}>읽은 책</button>
            </div>
            
            <h2>독서 기간</h2>
            <div className={styles.datePicker}>
              <label>독서 시작</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className={styles.datePicker}>
              <label>독서 종료</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            
            <button className={styles.saveButton} onClick={handleSaveReadingStatus}>저장</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SearchBooks;