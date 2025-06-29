import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import AuthButton from '../../components/auth/AuthButton'; // 로그인, 로그아웃 버튼
import type { RootState } from '../../store';

const Header = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  return (
    <header className='layout_header'>
      <h1 className='layout_header_logo'>
        <Link to='/' className=''>
          <span className=''>BOARD SIDE&nbsp;</span>
          PROJECT
          <p>It’s a side project built with React, Vite, and Firebase.</p>
        </Link>
      </h1>

      <nav className='layout_header_nav'>
        <ul>
          <li>
            <NavLink to='/FreeBoard' className='button -dark'>
              게시판
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className='layout_header_join'>
        <AuthButton />

        {!user && !loading && (
          <div>
            <NavLink to='/register' className='button -salmon'>
              Register
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
