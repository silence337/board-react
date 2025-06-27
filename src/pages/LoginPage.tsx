import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebase';

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';
  console.log('location state:', location.state);

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      alert('로그인 성공!');
      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message); // 또는 err.code, err.name 등
      } else {
        setError('예상치 못한 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      type='login'
      onSubmit={handleLogin}
      error={error}
      loading={loading}
    />
  );
};
export default LoginPage;
