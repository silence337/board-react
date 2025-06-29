import React from 'react';
import { useForm, FieldErrors } from 'react-hook-form';

type FormValues = {
  email: string;
  displayName: string;
  password: string;
  confirmPassword?: string;
};

type AuthFormProps = {
  type: 'login' | 'register';
  onSubmit: (data: FormValues) => void | Promise<void>;
  error?: string | null;
  loading?: boolean;
};

const AuthForm = ({ type, onSubmit, error, loading }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      displayName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');

  const onValid = async (data: FormValues) => {
    await onSubmit(data);
  };

  const onInvalid = (errors: FieldErrors<FormValues>) => {
    //console.log('Invalid submit triggered:', errors);
    //alert 으로 error 출력
    const firstError =
      errors.email?.message ||
      errors.displayName?.message ||
      errors.password?.message ||
      errors.confirmPassword?.message;
    if (firstError) alert(firstError);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <div className='ring'>
          <i style={{ '--clr': '#00ff0a' } as Record<string, string>}></i>
          <i style={{ '--clr': '#ff0057' } as Record<string, string>}></i>
          <i style={{ '--clr': '#fffd44' } as Record<string, string>}></i>
          <div className='login'>
            <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
            <div className='inputBx'>
              <input
                type='text'
                placeholder='email address'
                {...register('email', {
                  required: 'email address',
                  validate: (v) => !!v?.trim() || '이메일을 입력해주세요.',
                })}
              />
            </div>
            {type === 'register' && (
              <div className='inputBx'>
                <input
                  type='text'
                  placeholder='닉네임'
                  {...register('displayName', {
                    required: '닉네임',
                    validate: (v) => !!v?.trim() || '닉네임을 입력해주세요.',
                  })}
                />
              </div>
            )}
            <div className='inputBx'>
              <input
                type='password'
                placeholder='Password'
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                  minLength: {
                    value: 6,
                    message: '비밀번호는 최소 6자리 이상이어야 합니다.',
                  },
                  validate: (v) => !!v?.trim() || '비밀번호를 입력해주세요.',
                })}
              />
            </div>

            {type === 'register' && (
              <div className='inputBx'>
                <input
                  type='password'
                  placeholder='confirm Password'
                  {...register('confirmPassword', {
                    required: '비밀번호 확인을 입력해주세요.',
                    minLength: {
                      value: 6,
                      message: '비밀번호는 최소 6자리 이상이어야 합니다.',
                    },
                    validate: (v) =>
                      v === passwordValue || '비밀번호가 일치하지 않습니다.',
                  })}
                />
              </div>
            )}

            <div className='inputBx'>
              <button
                type='submit'
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${
                  type === 'login' ? 'bg-blue-500' : 'bg-green-500'
                }`}
              >
                {loading
                  ? '처리 중...'
                  : type === 'login'
                  ? '로그인'
                  : '회원가입'}
              </button>
              {error && <p className='text-red-500 mt-2'>{error}</p>}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AuthForm;
