// pages

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import FilterSortBar from '../filterbar'; // Adjust the import path as necessary
import Paginator from '../paginator'; // Adjust the import path as necessary
import BrowseContext from "../../contexts/browseContext";
import Alphabet from './alphabets';
import Link from 'next/link';
import { MagnifyingGlass } from 'react-loader-spinner'

const List = () => {
  const router = useRouter();
  const { pageDetails, setPageDetails, data, loading } = useContext(BrowseContext);
  const { number, size, totalPages, totalElements, pageCounter } = pageDetails



  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // Calculate the books to display based on the current page
  // const indexOfLastBook = currentPage * booksPerPage;
  // const indexOfFirstBook = indexOfLastBook - booksPerPage;
  // const currentBooks = docs.slice(indexOfFirstBook, indexOfLastBook);

  const handleBoxClick = (bookId) => {
    // Navigate to a specific page (replace '/book-details' with actual route)
    //   router.push(`/garden_city_university/${bookId}`);
  };
  const onPageUpdate = (by, type) => {
    let counter = pageCounter
    let num = number
    if (by == "number") {
      setPageDetails({ ...pageDetails, number: type, pageCounter: counter + num })
    } else {
      let newPage = number
      if (type == "next") {
        newPage = newPage + 1
        setPageDetails({ ...pageDetails, number: newPage, pageCounter: counter + num })

      } else if (type == "prev") {
        newPage = newPage - 1
        setPageDetails({ ...pageDetails, number: newPage, pageCounter: counter + num })

      }

    }


  }
  return (
    <div className="reltive min-h-screen ">
      <Alphabet />
      <div className='mt-4'>
        <Paginator
          number={number}
          pageCounter={pageCounter}
          onPageUpdate={onPageUpdate}
          size={size}
          totalElements={totalElements}
          totalPages={totalPages} />
      </div>
      {!loading ? <div className="  mt-4 ">
        <div className="flex flex-col gap-4">
          {data.map((book) => (
            <div
              key={book.id}
              className="flex flex-col  p-4  bg-white rounded-lg shadow-md cursor-pointer"
            >
              <div className="flex items-start">
                {book.imageUrl ?
                  <div className='w-[200px] h-[200px] flex justify-center items-center'>

                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-[120px] h-[160px]  mt-2 mr-4 "
                    />
                  </div>
                  :
                  <div className='w-[200px] h-[200px] flex justify-center items-center'>
                    <div className='w-[120px] h-[160px] bg-gray-100 flex text-center justify-center items-center'>
                      No thumbnail available
                    </div>
                  </div>}
                <div className="flex flex-col  flex-1 justify-center">
                  <Link href={{
                    pathname: `/${book.id}`,
                    query: {
                      data: JSON.stringify(book)
                    }
                  }} className="text-header mb-3 text-black no-underline hover:underline">{book.title}</Link>
                  <div className='flex text-base mb-3 '>by   <div className="px-2 underline"> {book.author} </div>
                    , <div className="px-2 underline"> {book.publisher} {book.date}</div>
                  </div>

                  <div className="text-base text-black line-clamp-3">{book.description}</div>
                  {book.resourceLogo &&
                    <div className='mt-3 flex justify-start items-center'>

                      <img
                        src={book.resourceLogo}
                        alt={book.title}
                        className="w-[30px] h-[30px]"
                      />
                    </div>}
                </div>
              </div>


            </div>
          ))}
        </div>

      </div>
        :
        <div className='flex flex-col'>
          <div className='mt-5 text-subheader'>
            Loading result...
          </div>
          <MagnifyingGlass
            height="80"
            width="80"
            glassColor="#c0efff"
            color="rgba(245, 130, 32, 1)"
            ariaLabel="loading"

          />
        </div>
      }
      {!loading && <div className='mt-4'>
        <Alphabet />
      </div>}
      {!loading && <div className='mt-4'>
        <Paginator
          number={number}
          pageCounter={pageCounter}
          onPageUpdate={onPageUpdate}
          size={size}
          totalElements={totalElements}
          totalPages={totalPages} />
      </div>}
    </div>
  );
};

export default List;
