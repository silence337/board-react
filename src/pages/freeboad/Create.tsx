import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../../store';
import { createBoard } from '../../features/board/BoardSlice';
import BoardForm from '../../components/board/BoardForm';

const BoardCreate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    title: string;
    content: string;
    author: string;
  }) => {
    await dispatch(
      createBoard({
        ...data,
        date: new Date().toISOString(),
      })
    );
    navigate('/FreeBoard');
  };

  return <BoardForm onSubmit={handleSubmit} />;
};

export default BoardCreate;
