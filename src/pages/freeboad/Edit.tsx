import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store';
import { updateBoard, fetchBoardById } from '../../features/board/BoardSlice';
import BoardForm from '../../components/board/BoardForm';

const BoardEdit = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { current: board } = useSelector((state: RootState) => state.board);

  useEffect(() => {
    // console.log('board:', board);
    // console.log('loading:', loading);
    // console.log('error:', error);
    if (!board && id) {
      dispatch(fetchBoardById(id));
    }
  }, [dispatch, id, board]);
  // console.log('board in component:', board);

  const handleSubmit = async (data: {
    title: string;
    content: string;
    author: string;
  }) => {
    if (!id) return;
    await dispatch(
      updateBoard({
        id,
        ...data,
        date: new Date().toISOString(),
      })
    );
    navigate('/FreeBoard');
  };

  if (!board) return <p>게시글이 없습니다.</p>;

  return <BoardForm onSubmit={handleSubmit} initialValues={board} />;
};

export default BoardEdit;
