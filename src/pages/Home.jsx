import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './Home.module.scss';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);

  useEffect(() => {
    // localStorage에 저장된 책 정보 불러오기
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    setBooks(savedBooks);

    // API를 통한 책 정보 불러오기
    const fetchBookInfo = async () => {
      try {
        const user_seq = localStorage.getItem('user_seq');  // localStorage에서 user_seq 가져오기
        const response = await fetch(`/api/book/searchBookInfo?user_seq=${user_seq}&reading_status=0`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log("응답 데이터: ", data);

        if (data && data.data && data.data.bookList) {
          setBooks(data.data.bookList);
        } else {
          console.error('책 리스트가 없습니다.');
        }
      } catch (error) {
        console.error('책 정보 조회 중 오류 발생:', error);
      }
    };

    fetchBookInfo();
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setSelectedBookIndex((prevIndex) => (prevIndex + 1) % books.length); // 마지막 책에서 첫 번째로
    },
    onSwipedRight: () => {
      setSelectedBookIndex((prevIndex) =>
        (prevIndex - 1 + books.length) % books.length  // 첫 번째 책에서 마지막으로
      );
    },
    trackMouse: true,
  });

  const getDisplayedBooks = () => {
    const prevIndex = (selectedBookIndex - 1 + books.length) % books.length;
    const nextIndex = (selectedBookIndex + 1) % books.length;

    return [
      books[prevIndex],
      books[selectedBookIndex], // 가운데 선택된 책
      books[nextIndex],
    ];
  };

  return (
    <div
      className={styles.homeContainer}
      {...handlers}
      style={{
        backgroundImage: `url('/assets/images/background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
      }}
    >
      <div className={styles.bookScrollContainer}>
        <div className={styles.bookScroll}>
          {getDisplayedBooks().map((book, index) => (
            <div
              key={book?.book_seq || index}
              className={`${styles.bookItem} ${index === 1 ? styles.selected : ''}`} // 가운데 책에 'selected' 클래스 부여
            >
              <img src={book?.book_cover} alt={`책 표지 ${index + 1}`} className={styles.bookCover} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.statusContainer}>
        <button className={styles.statusButton}>
          {books[selectedBookIndex]?.reading_status === 0
            ? '읽을 책'
            : books[selectedBookIndex]?.reading_status === 1
            ? '읽는 중'
            : '읽은 책'}
        </button>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{
            width: `${
              books[selectedBookIndex]?.reading_status === 0
                ? 0
                : books[selectedBookIndex]?.reading_status === 1
                ? 50
                : books[selectedBookIndex]?.reading_status === 2
                ? 100
                : 0
            }%`,
          }}
        ></div>
      </div>

      {books.length > 0 && (
        <div className={styles.bookInfo}>
          <div className={styles.infoRow}>
            <span className={styles.label}>책 정보</span>
            <span>{books[selectedBookIndex].title}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>출판사</span>
            <span>{books[selectedBookIndex].publisher}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>ISBN</span>
            <span>{books[selectedBookIndex].isbn}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>페이지</span>
            <span>{books[selectedBookIndex].pages}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;