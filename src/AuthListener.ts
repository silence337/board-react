import { useEffect } from 'react';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser, logout } from './features/auth/AuthSlice';

//Firebase 인증 상태 감지 및 Redux 저장
const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        //Firebase User 객체는 직렬화되지 않은 많은 객체로 필요한 정보만.
        const safeUser = {
          uid: user.uid,
          email: user.email,
        };
        dispatch(setUser(safeUser));
      } else {
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthListener;
