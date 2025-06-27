import React, { useState } from 'react';

type AuthFormProps = {
  type: 'login' | 'register';
  onSubmit: (data: {
    email: string;
    password: string;
    confirmPassword?: string;
  }) => void;
  error?: string | null;
  loading?: boolean;
};

const AuthForm = ({ type, onSubmit, error, loading }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'register' && password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    onSubmit({
      email,
      password,
      confirmPassword: type === 'register' ? confirmPassword : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-10'>
      <h2 className='text-2xl mb-4'>
        {type === 'login' ? '로그인' : '회원가입'}
      </h2>
      <input
        type='email'
        placeholder='이메일'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='border p-2 mb-2 w-full'
        required
      />
      <input
        type='password'
        placeholder='비밀번호'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='border p-2 mb-2 w-full'
        required
      />
      {type === 'register' && (
        <input
          type='password'
          placeholder='비밀번호 확인'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='border p-2 mb-2 w-full'
          required
        />
      )}
      <button
        type='submit'
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          type === 'login' ? 'bg-blue-500' : 'bg-green-500'
        }`}
      >
        {loading ? '처리 중...' : type === 'login' ? '로그인' : '회원가입'}
      </button>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </form>
  );
};

export default AuthForm;
