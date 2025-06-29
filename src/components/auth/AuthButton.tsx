import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import type { RootState } from '../../store';
import { logout } from '../../features/auth/AuthSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout()); // 리덕스 상태 초기화
      if (!user && !loading) return navigate('/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login', { state: { from: location } });
  };

  if (loading) {
    return;
  }

  return (
    <span>
      {user ? (
        <button type='button' onClick={handleLogout} className='button -blue'>
          Logout
        </button>
      ) : (
        <button type='button' onClick={handleLogin} className='button -blue'>
          Login
        </button>
      )}
    </span>
  );
};

export default LogoutButton;
