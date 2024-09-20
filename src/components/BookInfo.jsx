import React from 'react'
import '../assets/scss/bookshelf_contents.scss'

const BookInfo = () => {
  return (
    <div className='book_info_div'>
        <div>
          <p className='book_info_title'>책 정보</p>
          <p className='book_info_text'>미움받을 용기</p>
        </div>
        <div>
          <p className='book_info_title'>출판사</p>
          <p className='book_info_text'>인플루엔셜</p>
        </div>
        <div>
          <p className='book_info_title'>ISBN</p>
          <p className='book_info_text'>
          9788996991342</p>
        </div>
        <div>
          <p className='book_info_title'>페이지</p>
          <p className='book_info_text'></p>
        </div>
      </div>
  )
}

export default BookInfo