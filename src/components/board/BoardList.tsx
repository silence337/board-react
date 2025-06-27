import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Board } from '../../types/board';

interface Props {
  board: Board[];
  currentPage: number;
  listsPerPage: number;
}

const List = ({ board, currentPage, listsPerPage }: Props) => {
  // sort 순서 변경, 최적화를 위한 useMemo 사용 (메모이제이션)
  const sortedList = useMemo(() => {
    return [...board].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [board]);

  // 글 목록 클라이언트 페이징 처리 , 최적화를 위한 useMemo 사용 (메모이제이션)
  const currentLists = useMemo(() => {
    const indexOfLast = currentPage * listsPerPage;
    const indexOfFirst = indexOfLast - listsPerPage;
    return sortedList.slice(indexOfFirst, indexOfLast);
  }, [sortedList, currentPage, listsPerPage]);

  return (
    <div className='container max-w-3xl px-4 mx-auto sm:px-8'>
      <div className='py-8'>
        <div className='px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8'>
          <div className='inline-block min-w-full overflow-hidden rounded-lg shadow'>
            <h2 className='text-2xl font-semibold mb-4'>📋 게시판</h2>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr className='bg-gray-100 text-gray-600'>
                  <th className='w-1/12 p-2 text-left'>번호</th>
                  <th className='w-7/12 p-2 text-left'>제목</th>
                  <th className='w-2/12 p-2 text-left'>작성자</th>
                  <th className='w-2/12 p-2 text-left'>작성일</th>
                </tr>
              </thead>
              <tbody>
                {currentLists.map((list, index) => {
                  const number =
                    board.length - (currentPage - 1) * listsPerPage - index;
                  return (
                    <tr
                      key={list.id}
                      className='border-b hover:bg-gray-50 cursor-pointer'
                    >
                      <td className='p-2'>{number}</td>
                      <td className='p-2 text-blue-600 hover:underline'>
                        <Link to={`/FreeBoard/post/${list.id}`}>
                          {list.title}
                        </Link>
                      </td>
                      <td className='p-2'>{list.author}</td>
                      <td className='p-2'>
                        {new Date(list.date).toLocaleDateString('ko-KR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
