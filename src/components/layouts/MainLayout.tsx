import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import AuthButton from '../../components/auth/AuthButton'; // 로그인, 로그아웃 버튼

const Root = () => {
  return (
    <div className='w-full bg-white shadow-md p-4 fixed top-0 left-0 z-20'>
      <header className='w-full bg-white shadow-md p-4 fixed top-0 left-0 z-20'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <div className='hidden md:flex w-full justify-between items-center'>
            <h1 className='text-lg font-bold'>
              <Link to='/'>home</Link>
            </h1>
            <nav className='flex space-x-4'>
              <ul>
                <li>
                  <NavLink to='/FreeBoard'>게시판</NavLink>
                </li>
                <li>
                  <AuthButton />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className='mt-16 md:mt-20 p-4 bg-gray-100'>
        <div className='max-w-7xl mx-auto'>
          <Outlet />
        </div>
      </main>

      <footer>
        <small>© 2025 My App</small>
      </footer>
    </div>
  );
};

export default Root;
