import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.scss';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
        <img src="/assets/icons/home.png" alt="Home" className={styles.icon} />
      </Link>
      <Link to="/SearchBooks" className={location.pathname === '/search' ? styles.active : ''}>
        <img src="/assets/icons/search.png" alt="Search" className={styles.icon} />
      </Link>
      <Link to="/BookShelf" className={location.pathname === '/BookShelf' ? styles.active : ''}>
        <img src="/assets/icons/bookshelf.png" alt="BookShelf" className={styles.icon} />
      </Link>
      <Link to="/MyPage" className={location.pathname === '/MyPage' ? styles.active : ''}>
        <img src="/assets/icons/user.png" alt="User" className={styles.icon} />
      </Link>
    </nav>
  );
};

export default NavBar;
