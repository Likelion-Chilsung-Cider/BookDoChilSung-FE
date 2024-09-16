import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookShelf.module.scss';

const BookShelf = () => {
  const [filter, setFilter] = useState('전체');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // 필터링된 책 목록 저장
  const navigate = useNavigate();

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    setBooks(savedBooks);
    setFilteredBooks(savedBooks); // 초기 상태로 전체 책 목록 설정
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  // 필터링 함수
  const handleFilterClick = (filterType) => {
    setFilter(filterType);

    let filtered = books; // 기본적으로 모든 책 포함

    if (filterType === '읽을 책') {
      filtered = books.filter(book => book.reading_status === 0);
    } else if (filterType === '읽는 중') {
      filtered = books.filter(book => book.reading_status === 1);
    } else if (filterType === '읽은 책') {
      filtered = books.filter(book => book.reading_status === 2);
    }

    setFilteredBooks(filtered); // 필터링된 책 목록 저장
  };

  return (
    <div className={styles.searchBooks}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBackClick}>
          <img src="/assets/icons/arrow.png" alt="뒤로가기" className={styles.icon} />
        </button>
        <div className={styles.searchBar}>
          <img src="/assets/icons/c_search.png" alt="검색" className={styles.icon} />
          <input type="text" />
        </div>
      </div>

      {/* 필터링 */}
      <div className={styles.filters}>
        <button 
          className={filter === '전체' ? styles.active : ''} 
          onClick={() => handleFilterClick('전체')}
        >전체</button>
        <button 
          className={filter === '읽을 책' ? styles.active : ''} 
          onClick={() => handleFilterClick('읽을 책')}
        >읽을 책</button>
        <button 
          className={filter === '읽는 중' ? styles.active : ''} 
          onClick={() => handleFilterClick('읽는 중')}
        >읽는 중</button>
        <button 
          className={filter === '읽은 책' ? styles.active : ''} 
          onClick={() => handleFilterClick('읽은 책')}
        >읽은 책</button>
      </div>

      <div className={styles.bookList}>
        {filteredBooks.map((book, index) => (
          <div className={styles.bookCard} key={index}>
            <img src={book.book_cover} alt={book.title} className={styles.bookCover} />
            <div className={styles.bookInfo}>
              <h3>{book.title}</h3>
              <p>{book.start_date} - {book.end_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookShelf;