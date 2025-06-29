import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

interface Board {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

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
    <div className=''>
      <table>
        <colgroup>
          <col width='10%'></col>
          <col width='60%'></col>
          <col width='15%'></col>
          <col width='15%'></col>
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {currentLists.map((list, index) => {
            const number =
              board.length - (currentPage - 1) * listsPerPage - index;
            return (
              <tr key={list.id} className=''>
                <td className=''>{number}</td>
                <td className='subject'>
                  <Link to={`/FreeBoard/post/${list.id}`}>{list.title}</Link>
                </td>
                <td className=''>{list.author}</td>
                <td className=''>
                  {new Date(list.date).toLocaleDateString('ko-KR')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
