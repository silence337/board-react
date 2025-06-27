import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebase';

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
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
