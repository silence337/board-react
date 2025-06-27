import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import {
  fetchBoardList,
  setCurrentPage,
} from '../../features/board/BoardSlice';
import List from '../../components/board/BoardList';
import Pagination from '../../components/board/Pagination';

const FreeBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const { list, loading, error, currentPage, listsPerPage } = useSelector(
    (state: RootState) => state.board
  );

  const onPageChange = (pageNum: number) => {
    // uri에 페이징 쿼리 파라미터 추가
    setSearchParams({ page: pageNum.toString() });
  };

  useEffect(() => {
    dispatch(setCurrentPage(page)); // setSearchParams 인해 uri 가 변경되면 재렌더링시 setCurrentPage Redux 상태 동기화
    dispatch(fetchBoardList());
  }, [dispatch, page]);

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>오류 발생: {error}</p>;
  if (list.length === 0) return <p>게시글이 없습니다.</p>;

  return (
    <div>
      <List
        board={list}
        currentPage={currentPage}
        listsPerPage={listsPerPage}
      />
      <Pagination
        totalItems={list.length}
        itemsPerPage={listsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default FreeBoard;
