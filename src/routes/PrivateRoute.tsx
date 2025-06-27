import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { RootState } from '../store';

const PrivateRoute = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const location = useLocation(); // 로그인 페이지 이전의 마지막에 있던 페이지로 이동하기 위한것

  if (loading) {
    return <div>로딩 중...</div>; // Firebase 초기 로딩 중일 때
  }

  if (!user) {
    return <Navigate to='/login' replace state={{ from: location }} />; // 로그인 안되어 있으면 리디렉션
  }

  return <Outlet />; // 로그인 완료된 경우 자식 라우트 렌더링
};

export default PrivateRoute;
