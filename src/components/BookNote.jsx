import React, { useState } from 'react'
import plus from '../assets/svg/bookshelf_plus.svg'
import pen from '../assets/svg/bookshelf_pen.svg'
import '../assets/scss/bookshelf_contents.scss'

const BookNote = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const closeIconClick = () => {
    setIsPopupVisible(true);
  }
  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };
  return (
    <div className='book_note_div'>
      <img src={plus} alt="" className='plus' onClick={closeIconClick} />
      <div className='note_div'>
        <p className='date'>2024.08.19</p>
        <p className='text'></p>
        <img src={pen} alt="" />
      </div>

      {isPopupVisible && (
        <div>
          <div className='note_div'>
            <p className='date'>2024.08.19</p>
            <p className='text'></p>
            <img src={pen} alt="" />
          </div>
          <img src={plus} alt="" className='plus' />
        </div>
      )}
    </div>


  )
}

export default BookNote