import React from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  title: string;
  content: string;
  author: string;
};

interface Props {
  onSubmit: (data: FormValues) => void | Promise<void>;
}

const BoardForm = ({ onSubmit }: Props) => {
  //const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
  });

  const onValid = (data: FormValues) => {
    onSubmit(data);
  };

  const onInvalid = () => {
    //alert 으로 error 출력
    const firstError =
      errors.title?.message ||
      errors.author?.message ||
      errors.content?.message;
    if (firstError) alert(firstError);
  };

  return (
    <div className='max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg'>
      <h2 className='text-2xl font-bold mb-6'>글쓰기</h2>
      <input
        className='w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
        {...register('title', {
          required: '제목을 입력하세요.',
          validate: (v) =>
            v.trim() !== '' || '제목은 공백만 입력할 수 없습니다.',
        })}
        placeholder='제목'
      />
      <input
        className='w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
        {...register('author', {
          required: '작성자를 입력하세요.',
          validate: (v) =>
            v.trim() !== '' || '작성자는 공백만 입력할 수 없습니다.',
        })}
        placeholder='작성자'
      />
      <textarea
        className='w-full h-40 border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400'
        {...register('content', {
          required: '내용을 입력하세요.',
          validate: (v) =>
            v.trim() !== '' || '내용은 공백만 입력할 수 없습니다.',
        })}
        placeholder='내용'
      />
      <button
        type='submit'
        onClick={handleSubmit(onValid, onInvalid)}
        className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition'
      >
        등록
      </button>
    </div>
  );
};

export default BoardForm;
