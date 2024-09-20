import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import LoginMain from './pages/LoginMain';
import Home from './pages/Home';
import KakaoLoginAuth from './pages/KakaoLoginAuth';
import SearchBooks from './pages/SearchBooks';
import BookShelf from './pages/BookShelf';
import BookShelfDetail from './pages/BookShelfDetail';
import MyPage from './pages/MyPage';
import BookDetail from './pages/BookShelfDetail'

const setVh = () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
};
window.addEventListener('resize', setVh);
setVh();

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginMain />,
    errorElement: <NotFound />,
  },
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'SearchBooks', element: <SearchBooks /> },
      { path: 'BookShelf', element: <BookShelfDetail /> },
      { path: 'MyPage', element: <MyPage /> },
    ],
  },
  { path: 'account/kakao/callback', element: <KakaoLoginAuth /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <>
    {/* <CookiesProvider> */}
    <RouterProvider router={router} />
    <meta name='viewport' content='initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width' />
    {/* </CookiesProvider> */}
  </>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
