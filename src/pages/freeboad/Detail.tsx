import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoardById } from '../../features/board/BoardSlice';
import BoardDetail from '../../components/board/BoardDetail';
import type { RootState, AppDispatch } from '../../store';

const FreeBoardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const {
    current: board,
    loading,
    error,
  } = useSelector((state: RootState) => state.board);

  useEffect(() => {
    if (id) dispatch(fetchBoardById(id));
  }, [id, dispatch]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!board) return <p>게시글 없음</p>;

  return (
    <div>
      <BoardDetail boardView={board} />
    </div>
  );
};

export default FreeBoardDetail;
