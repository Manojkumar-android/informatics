import React from 'react';

const Paginator = ({ currentPage, totalPages, handlePageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-between items-center py-4 h-[64px] px-6 bg-white shadow-md rounded-lg">
      {/* Page Info */}
      <div className="text-sm text-gray-700">
        Showing {currentPage} to {totalPages} out of {totalPages}
      </div>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          className="px-2 py-1 bg-white rounded-lg hover:bg-gray-100"
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {getPageNumbers().map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-2 py-1 rounded-md ${currentPage === number ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            {number}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          className="px-2 py-1 bg-white rounded-lg hover:bg-gray-100"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Paginator;
