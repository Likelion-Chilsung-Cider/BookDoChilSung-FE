import React from 'react';
import bookshelf_back from '../assets/svg/bookshelf_back.svg'
import '../assets/scss/mypage.scss'

export default function MyPage() {
  return (
    <div className='back'>
      <div className='top_bar_div'>
        <img src={bookshelf_back} alt="" />
      </div>
      <div className='info_div'>
        <p className='name'>사용자 닉네임</p>
        <div className='fix'>수정</div>
        <div className='picture'></div>
        <div className='change'>사진변경</div>
        <p className='txt'>북도칠성과 독서한지</p>
        <p className='date'>"100일"</p>
      </div>

      <p className='title'>월별 독서량</p>
      <div className='month_div'>

      </div>
    </div>
  );
}
