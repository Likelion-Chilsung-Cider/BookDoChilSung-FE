import React from 'react';
import { NavLink } from "react-router-dom";
import '../header/nav.css'
import nav_home from '../../assets/svg/nav_home.svg'
import nav_search from '../../assets/svg/nav_search.svg'
import nav_book from '../../assets/svg/nav_book.svg'
import nav_mypage from '../../assets/svg/nav_mypage.svg'


export default function NavBar() {
  return <nav>
    <div>
      <NavLink to="/">
        <img src={nav_home} alt="" />
      </NavLink>
    </div>
    <div>
      <NavLink to="/SearchBooks">
        <img src={nav_search} alt="" />
      </NavLink>
    </div>
    <div>
      <NavLink to="/BookShelf">
        <img src={nav_book} alt="" />
      </NavLink>
    </div>
    <div>
      <NavLink to="/MyPage">
        <img src={nav_mypage} alt="" />
      </NavLink>
    </div>
  </nav>;
}
