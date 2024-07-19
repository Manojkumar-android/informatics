// pages 

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FilterSortBar from './components/filterbar'; // Adjust the import path as necessary
import Paginator from './components/paginator'; // Adjust the import path as necessary

const Books = () => {
  const router = useRouter();

  // Dummy data for books (replace with actual data)
  const books = [
    { id: 1, title: 'DHARANA – Bhavan’s International Journal of Business', author: 'Online Journals, Print Journals', imageUrl: '/book1.png' },
    { id: 2, title: 'Indian Journal of Power and River Valley Development Journal of Biological Control', author: 'Online Journals, Print Journals', imageUrl: '/book2.png' },
    { id: 3, title: 'Journal of Biological Control', author: 'Online Journals, Print Journals', imageUrl: '/book3.png' },
    { id: 4, title: 'Journal of Ecophysiology and Occupational Health', author: 'Online Journals, Print Journals', imageUrl: '/book4.png' },
    { id: 5, title: 'Journal of Biological Control', author: 'Online Journals, Print Journals', imageUrl: '/book3.png' },
    { id: 6, title: 'Journal of Ecophysiology and Occupational Health', author: 'Online Journals, Print Journals', imageUrl: '/book4.png' },
    { id: 7, title: 'DHARANA – Bhavan’s International Journal of Business', author: 'Online Journals, Print Journals', imageUrl: '/book1.png' },
    { id: 8, title: 'Indian Journal of Power and River Valley Development Journal of Biological Control', author: 'Online Journals, Print Journals', imageUrl: '/book2.png' },
    { id: 9, title: 'Journal of Ecophysiology and Occupational Health', author: 'Online Journals, Print Journals', imageUrl: '/book4.png' },
    { id: 10, title: 'DHARANA – Bhavan’s International Journal of Business', author: 'Online Journals, Print Journals', imageUrl: '/book1.png' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(true);

  const booksPerPage = isGridView ? 8 : 4;

  // Calculate the books to display based on the current page or show all
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handleReadClick = (bookId) => {
    // Navigate to a specific page (replace '/book-details' with actual route)
    router.push(`/book-details/${bookId}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleGridViewToggle = () => {
    setIsGridView((prevView) => !prevView);
  };

  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="relative min-h-screen">
      <FilterSortBar isGridView={isGridView} handleGridViewToggle={handleGridViewToggle} />

      <div className="container mx-auto px-0 mt-8">
        <div className={`grid ${isGridView ? 'grid-cols-2 md:grid-cols-4 gap-2 mt-4' : ''}`}>
          {currentBooks.map((book) => (
            <div
              key={book.id}
              className={`m-1 p-12 py-5 h-[504px] bg-white rounded-lg shadow-md ${isGridView ? 'w-full' : 'mb-4'}`}
            >
              <div className="flex flex-col h-full justify-between">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className={`object-cover ${isGridView ? 'w-[170.06px] h-[267px]' : 'w-[131.85px] h-[207px]'}`}
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-base font-semibold underline mb-2 truncate">{book.title}</h2>
                  <p className="text-sm text-gray-600 flex-grow">{book.author}</p>
                  <button
                    onClick={() => handleReadClick(book.id)}
                    className="mt-2 px-6 py-2 bg-white border text-base border-purple-900 text-purple-900 rounded-lg hover:bg-purple-300 focus:outline-none focus:bg-blue-600 self-start"
                  >
                    Read
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Books;
