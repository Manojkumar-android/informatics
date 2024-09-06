import React from 'react';

const Paginator = ({ number, size, totalPages, totalElements, onPageUpdate, pageCounter }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 10;
    const halfMaxPageNumbers = Math.floor(maxPageNumbersToShow / 2);

    let startPage = Math.max(1, number - halfMaxPageNumbers);
    let endPage = Math.min(totalPages, number + halfMaxPageNumbers);

    if (endPage - startPage < maxPageNumbersToShow - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    pageCounter > 0 ? <div className=" flex  justify-between items-center py-4 h-[64px] px-6 bg-white shadow-md rounded-lg">
      {/* Page Info */}
      <div className="text-sm text-gray-700">
        Showing {(number * size) - 9} to {number * size} out of {totalElements}
      </div>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => onPageUpdate("arrow", "prev")}
          className="px-2 py-1 bg-white rounded-lg hover:bg-gray-100 cursor-pointer"
          disabled={number == 1}
        >
          &lt;
        </button>

        {getPageNumbers().map((currentNumber) => (
          <button
            key={currentNumber}
            onClick={() => onPageUpdate("number", currentNumber)}
            className={`cursor-pointer px-2 py-1 rounded-md ${currentNumber == number ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            {currentNumber}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageUpdate("arrow", "next")}
          className="cursor-pointer px-2 py-1 bg-white rounded-lg hover:bg-gray-100"
          disabled={number == totalPages}
        >
          &gt;
        </button>
      </div>
    </div >
      : null
  );
};

export default Paginator;
