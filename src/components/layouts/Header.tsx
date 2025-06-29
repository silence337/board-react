import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import AuthButton from '../../components/auth/AuthButton'; // 로그인, 로그아웃 버튼
import type { RootState } from '../../store';

const Header = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  /** issue
   * 페이지 새로고침하면 Redux store가 초기화 상태에서
   * 비동기 Firebase Auth 세션 복원으로 user 값이 null 에서 Firebase 인증 후 적용되는 과정에
   * UI 깜박임 문제는 부분적으로 처리했지만,
   * 추후, Firebase 인증을 완료 된 후에 전체 UI를 렌더링하는 구조로 변경이 필요함
   *
   */

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
