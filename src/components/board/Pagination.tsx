import React from 'react';

interface PaginationProps {
  totalItems: number; // 전체 글 개수
  itemsPerPage: number; // 페이지당 글 수
  currentPage: number; // 현재 페이지
  onPageChange: (page: number) => void; // 페이지 변경 함수
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='pagination mt-4'>
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          style={{
            fontWeight: pageNum === currentPage ? 'bold' : 'normal',
            margin: '0 4px',
          }}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
