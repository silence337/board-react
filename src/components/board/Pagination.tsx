import React from 'react';

interface PaginationProps {
  totalItems: number; // 전체 글 개수
  itemsPerPage: number; // 페이지당 글 수
  currentPage: number; // 현재 페이지
  pageLimit?: number;
  onPageChange: (page: number) => void; // 페이지 변경 함수
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  pageLimit = 5,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentBlock = Math.ceil(currentPage / pageLimit);
  const startPage = (currentBlock - 1) * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <ul className='pagination'>
      <li className='pagination-item'>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </li>
      {pageNumbers.map((pageNum, index) => (
        <li
          key={index}
          className={`pagination-item ${
            pageNum === currentPage ? 'pg-active' : ''
          }`}
        >
          <button
            key={pageNum}
            onClick={() => {
              onPageChange(pageNum);
            }}
            // style={{
            //   fontWeight: pageNum === currentPage ? 'bold' : 'normal',
            //   margin: '0 4px',
            // }}
          >
            {pageNum}
          </button>
        </li>
      ))}
      <li className='pagination-item'>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
