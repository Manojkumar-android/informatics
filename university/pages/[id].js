import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import TopBarWithoutLogout from './topbarwithoutlogout';
import Footer from './footer_garden_city';
import { getDetails } from "../actions/searchAction";
import Link from 'next/link';
import userContext from "../contexts/userContext";

const Details = () => {
  const router = useRouter();
  const { id, link, data } = router.query;
  const { userSession } = useContext(userContext);

  // State to hold book details
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    console.log(JSON.parse(data))
    const book = data ? JSON.parse(data) : {};
    setBookDetails(book)
    if (book.database != "dspace") return
    const link = book.links?.self?.href
    //  alert(link)
    //  alert(JSON.stringify(book))
    //  console.log(JSON.parse(data.links))
    // Fetch details based on the link

    const body = { href: link }
    getDetails(body).then(res => {
      if (res.error) {
        console.log(res.error);
      } else {
        // Update state with the fetched data
        setBookDetails(res.details);
      }
    });
  }, []);

  // Render loading state or error handling
  if (!bookDetails) {
    return <p>Loading...</p>;
  }
  const handleClick = (e, link) => {
    // Replace this URL with the external link you want to open
    const externalLink = 'https://www.example.com';
    window.open(link, '_blank');
  };
  return (
    <div>
      <TopBarWithoutLogout />
      <div className="container mx-auto px-4 m-4 flex flex-col">
        {/* Left side */}
        <div className="text-header my-3 text-black " dangerouslySetInnerHTML={{ __html: bookDetails.title }} ></div>

        <div className="flex ">
          <div className="flex flex-col w-1/2 px-5">

            {bookDetails.imageUrl ?
              <div className='w-[200px] h-[200px] flex justify-center items-center my-3'>

                <img
                  src={bookDetails.imageUrl}
                  alt={bookDetails.title}
                  className="w-[160px] h-[200px]  mt-2 mr-4 "
                />
              </div>
              :
              <div className='w-[200px] h-[200px] flex justify-center items-center my-3'>
                <div className='w-[160px] h-[200px] bg-gray-100 flex text-center justify-center items-center'>
                  No thumbnail available
                </div>
              </div>}
            {/* {bookDetails.size && <div className='my-3'><div className='text-subheader text-gray-400 font-medium '> Files</div>
              <hr className="mt-2 border-t-1 border-gray-100 " />
              <Link href="#" className="text-subheader text-primary no-underline hover:underline">{bookDetails.file} ({bookDetails.size})</Link>
            </div>}  */}
            <div className='my-3'>
              <button
                onClick={(e) => handleClick(e, "")}
                className={`w-1/4 cursor-pointer border-0   text-[18px]   mt-6  py-3 ${userSession ? 'bg-secondary text-white' : 'bg-gray-200 text-black'} rounded-md  `}

              >

                <span>View</span>
              </button>
              {!userSession && <div className='text-low mt-1 '>Please login to view</div>}

            </div>
            <div className='my-3'><div className='text-subheader text-gray-400 font-medium'> Publisher</div>
              <hr className="mt-2 border-t-1 border-gray-100 w-full" />
              <div className="text-subheader text-black line-clamp-3">{bookDetails.publisher}</div>
            </div>
          </div>
          <div className="flex flex-col mt-3 w-1/2  px-5">
            {bookDetails.description != "N/A" &&
              (<div className='my-3'><div className='text-subheader text-gray-400 font-medium'> Abstract</div>
                <hr className="mt-2 border-t-1 border-gray-100 w-full" />
                <div className="text-subheader text-black line-clamp-3" dangerouslySetInnerHTML={{ __html: bookDetails.description }} ></div>
              </div>)
            }
            <div className='my-3'><div className='text-subheader text-gray-400 font-medium '> Date</div>
              <hr className="mt-2 border-t-1 border-gray-100 w-full" />
              <div className="text-subheader text-black line-clamp-3">{bookDetails.date}</div>
            </div>

            <div className='my-3'><div className='text-subheader text-gray-400 font-medium'> Authors</div>
              <hr className="mt-2 border-t-1 border-gray-100 w-full" />
              <div className="text-subheader text-black line-clamp-3">{bookDetails.author}</div>
            </div>
            {/* <div className='flex text-base mb-3 '>by   <div className="px-2 underline"> {bookDetails.author} </div>
              , <div className="px-2 underline"> {bookDetails.publisher} {bookDetails.date}</div>
            </div>

            <div className="text-base text-black line-clamp-3">{bookDetails.description}</div>
            <button className="bg-purple-800 text-white w-[360px] h-[48px] mt-6 px-4 py-2 rounded-lg" onClick={() => router.back()}>
              Want to Read
            </button> */}
          </div>


        </div>
      </div>


      <Footer />
    </div >
  );
};

export default Details;
