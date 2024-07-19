// pages

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FilterSortBar from './components/filterbar'; // Adjust the import path as necessary
import Paginator from './components/paginator'; // Adjust the import path as necessary

const Microcontroller = () => {
  const router = useRouter();

  // Dummy data for books (replace with actual data)
  const books = [
    {
      id: 1,
      title: 'Microcontrollers',
      subtitle: 'fundamentals and applications with PIC',
      author: 'by Fernando E. Valdés Pérez, Fernando E. Valdes-Perez, and Ramon Pallas-Areny',
      imageUrl: '/micro1.png',
      edition: 'An edition of Microcontrollers (2023)',
      rating: 4.5,
      wantToRead: 10,
      currentlyReading: 23,
      haveRead: 80,
      description: 'Embark on a comprehensive journey through the world of microcontrollers with "Mastering Microcontrollers: From Basics to Advanced Applications." This definitive guide is designed for both beginners and seasoned engineers, offering a clear and concise introduction to microcontrollers and their myriad applications.',
    },
    {
      id: 2,
      title: 'Embedded microcontrollers.',
      subtitle: 'by Intel Corporation.',
      author: 'by Fernando E. Valdés Pérez, Fernando E. Valdes-Perez, and Ramon Pallas-Areny',
      imageUrl: '/micro2.png',
      edition: 'An edition of Embedded microcontrollers (1994)',
      rating: 4.5,
      wantToRead: 10,
      currentlyReading: 23,
      haveRead: 80,
      description: 'Embark on a comprehensive journey through the world of microcontrollers with "Mastering Microcontrollers: From Basics to Advanced Applications." This definitive guide is designed for both beginners and seasoned engineers, offering a clear and concise introduction to microcontrollers and their myriad applications.',
    },
    {
      id: 3,
      title: 'Microcontroller cookbook',
      subtitle: 'by Mike James',
      author: 'by Fernando E. Valdés Pérez, Fernando E. Valdes-Perez, and Ramon Pallas-Areny',
      imageUrl: '/micro3.png',
      edition: 'An edition of Microcontroller Cookbook (1997)',
      rating: 4.5,
      wantToRead: 10,
      currentlyReading: 23,
      haveRead: 80,
      description: 'Embark on a comprehensive journey through the world of microcontrollers with "Mastering Microcontrollers: From Basics to Advanced Applications." This definitive guide is designed for both beginners and seasoned engineers, offering a clear and concise introduction to microcontrollers and their myriad applications.',
    },
    {
      id: 4,
      title: 'The 8051 microcontroller',
      subtitle: 'by I. Scott MacKenzie',
      author: 'by Fernando E. Valdés Pérez, Fernando E. Valdes-Perez, and Ramon Pallas-Areny',
      imageUrl: '/micro4.png',
      edition: 'An edition of Microcontrollers (2023)',
      rating: 4.5,
      wantToRead: 10,
      currentlyReading: 23,
      haveRead: 80,
      description: 'Embark on a comprehensive journey through the world of microcontrollers with "Mastering Microcontrollers: From Basics to Advanced Applications." This definitive guide is designed for both beginners and seasoned engineers, offering a clear and concise introduction to microcontrollers and their myriad applications.',
    },
    // Add more books here
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;

  // Calculate the books to display based on the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handleBoxClick = (bookId) => {
    // Navigate to a specific page (replace '/book-details' with actual route)
    router.push(`/book-details/${bookId}`);
  };

  return (
    <div className="relative min-h-screen">
      <FilterSortBar />

      <div className="container mx-auto px-4 mt-4">
        <div className="flex flex-col gap-4">
          {currentBooks.map((book) => (
            <div
              key={book.id}
              className="flex flex-col w-full p-4 h-[289px]  bg-white rounded-lg shadow-md cursor-pointer"
              onClick={() => handleBoxClick(book.id)}
            >
              <div className="flex items-start  mb-4">
                <input type="checkbox" className="mr-12" />
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-[131.85px] h-[207px] object-cover mt-4 mr-4 "
                />
                <div className="flex flex-col  flex-1 justify-center">
                  <span className="text-base text-black">{book.edition}</span>
                  <h2 className="text-4xl font-semibold">{book.title}</h2>
                  <p className="text-base text-black">{book.subtitle}</p>
                  <p className="text-base underline text-black">{book.author}</p> <br />
                  <span className="mr-2 text-black">★ {book.rating} {book.wantToRead} want to read 
                    {book.currentlyReading} currently reading {book.haveRead} have read
                    </span> <br />
            
                  <p className="text-base text-black">{book.description}</p>
                </div>
              </div>
            
              
            </div>
          ))}
        </div>
      </div>
      <div className='mt-4'>
      <Paginator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={books.length}
        itemsPerPage={booksPerPage}
      /></div>
    </div>
  );
};

export default Microcontroller;
