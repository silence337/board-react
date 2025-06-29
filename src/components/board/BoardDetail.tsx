import React from 'react';

interface Board {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface Props {
  boardView: Board | null;
}

const BoardDetail = ({ boardView }: Props) => {
  if (!boardView) return <p>게시글이 없습니다.</p>;
  return (
    <div className=''>
      <table className='table_board_view'>
        <tbody>
          <tr>
            <th>제목</th>
            <td>{boardView.title}</td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>{boardView.author}</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>{new Date(boardView.date).toLocaleDateString('ko-KR')}</td>
          </tr>
          <tr className='table_board_view-content'>
            <th>내용</th>
            <td>
              <div className='table_board_view-textwrap'>
                {boardView.content}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BoardDetail;
