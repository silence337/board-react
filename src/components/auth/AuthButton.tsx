import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import type { RootState } from '../../store';
import { logout } from '../../features/auth/AuthSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout()); // 리덕스 상태 초기화
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login', { state: { from: location } });
  };

  if (user) {
    return (
      <button
        onClick={handleLogout}
        className='bg-red-500 text-white px-4 py-2 rounded'
      >
        로그아웃
      </button>
    );
  }
  return (
    <button
      onClick={handleLogin}
      className='bg-red-500 text-white px-4 py-2 rounded'
    >
      로그인
    </button>
  );
};

export default LogoutButton;
