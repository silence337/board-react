import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthForm from '../components/auth/AuthForm';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { setUser } from '../features/auth/AuthSlice';

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleRegister = async (data: {
    email: string;
    displayName: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      // 1. 계정 생성 후 user 받기
      const userCreate = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCreate.user;

      // 2. 닉네임 업데이트 (displayName 설정)
      await updateProfile(user, { displayName: data.displayName });
      await user.reload();

      const updatedUser = auth.currentUser;

      dispatch(
        setUser({
          uid: updatedUser?.uid || '',
          email: updatedUser?.email || null,
          displayName: updatedUser?.displayName || null,
        })
      );

      //const refreshedUser = auth.currentUser; // or getAuth().currentUser
      //console.log(refreshedUser?.displayName);

      // 완료 후 메인으로 이동
      navigate('/');
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/email-already-in-use') {
          setError('이미 사용 중인 이메일입니다. 다른 이메일을 사용하세요.');
        } else {
          setError(err.message);
        }
      } else {
        setError('예상치 못한 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      type='register'
      onSubmit={handleRegister}
      error={error}
      loading={loading}
    />
  );
};
export default RegisterPage;
