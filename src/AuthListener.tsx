import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router';
import { setUser, logout, setLoading } from './features/auth/AuthSlice';

//Firebase 인증 상태 감지 및 Redux 저장
const AuthListener = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        //Firebase User 객체는 직렬화되지 않은 많은 객체로 필요한 정보만.
        const safeUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        dispatch(setUser(safeUser));
      } else {
        dispatch(logout());
      }
      setChecked(true);
      dispatch(setLoading(false));
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (!checked) {
    return <div>로딩중...</div>; // or 스켈레톤
  }

  return <RouterProvider router={router} />;
};

export default AuthListener;
