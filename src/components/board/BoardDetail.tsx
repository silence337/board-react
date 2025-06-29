import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import type { Board } from '../../types/board';

interface Props {
  board: Board | null;
}

const BoardDetail = ({ board }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthor = board && user && board.author === user.displayName;

  if (!board) return <p>게시글이 없습니다.</p>;
  return (
    <div className=''>
      <table className='table_board_view'>
        <tbody>
          <tr>
            <th>제목</th>
            <td>{board.title}</td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>{board.author}</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>{new Date(board.date).toLocaleDateString('ko-KR')}</td>
          </tr>
          <tr className='table_board_view-content'>
            <th>내용</th>
            <td>
              <div className='table_board_view-textwrap'>{board.content}</div>
            </td>
          </tr>
        </tbody>
      </table>
      {isAuthor && (
        <Link to={`/FreeBoard/edit/${board.id}`}>
          <button>수정하기</button>
        </Link>
      )}
    </div>
  );
};

export default BoardDetail;
