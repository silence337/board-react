import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../../store';
import { createBoard } from '../../features/board/BoardSlice';

const BoardCreate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      createBoard({
        title,
        content,
        author,
        date: new Date().toISOString(),
      })
    );
    navigate('/FreeBoard');
  };

  return (
    <div className='max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg'>
      <h2 className='text-2xl font-bold mb-6'>글쓰기</h2>
      <input
        className='w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='제목'
      />
      <input
        className='w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder='작성자'
      />
      <textarea
        className='w-full h-40 border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='내용'
      />
      <button
        type='submit'
        onClick={handleSubmit}
        className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition'
      >
        등록
      </button>
    </div>
  );
};

export default BoardCreate;
