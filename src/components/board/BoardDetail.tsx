import type { Board } from '../../types/board';

interface Props {
  boardView: Board | null;
}

const BoardDetail = ({ boardView }: Props) => {
  if (!boardView) return <p>게시글이 없습니다.</p>;
  return (
    <div className='max-w-3xl mx-auto p-6 bg-white rounded shadow'>
      <h2 className='text-2xl font-bold mb-2'>{boardView.title}</h2>
      <div className='text-gray-500 text-sm mb-4'>
        작성자: {boardView.author} | 작성일:{' '}
        {new Date(boardView.date).toLocaleDateString('ko-KR')}
      </div>
      <div className='text-gray-800 leading-relaxed whitespace-pre-line'>
        {boardView.content}
      </div>
    </div>
  );
};

export default BoardDetail;
