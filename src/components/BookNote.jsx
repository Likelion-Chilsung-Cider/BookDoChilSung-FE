import React, { useState } from 'react'
import plus from '../assets/svg/bookshelf_plus.svg'
import pen from '../assets/svg/bookshelf_pen.svg'
import check from '../assets/svg/memo_check.svg'
import '../assets/scss/bookshelf_contents.scss'

const BookNote = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // 팝업을 열고 닫는 함수
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  return (
    <div className='book_note_div'>
      <img src={plus} alt="Add note" className='plus' onClick={togglePopup} />
      {isPopupVisible && (
        <div className='popup'>
          <div className='note_div'>
            <p className='date'>2024.08.19</p>
            <textarea className='popup_text' placeholder='메모를 입력하세요'></textarea>
            <img src={pen} alt="" />
          </div>
          <img src={check} alt="" className='check' onClick={togglePopup}/>
        </div>
      )}
      <div className='note_div' onClick={togglePopup} >
        <p className='date'>2024.08.19</p>
        <p className='text'></p>
        <img src={pen} alt="" />
      </div>
    </div>


  )
}

export default BookNote