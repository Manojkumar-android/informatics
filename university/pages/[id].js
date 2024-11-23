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
  const { userSession, setIsLoginPopupOpen } = useContext(userContext);

  // State to hold book details
  const [bookDetails, setBookDetails] = useState(null);

  //abstract view more
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription((prevState) => !prevState);
  };

  useEffect(() => {
    //  console.log(JSON.parse(data))
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
    alert(JSON.stringify(userSession))
  }, []);

  // Render loading state or error handling
  if (!bookDetails) {
    return <p>Loading...</p>;
  }
  const handleClick = (e, link) => {
    if (!link) return;
    let externalLink = link
    if (externalLink.includes("https://idr.informaticsglobal.ai")) {
      const newBaseUrl = "https://idr-informaticsglobal-api.baiu.remotlog.com";

      externalLink = externalLink.replace("https://idr.informaticsglobal.com", newBaseUrl);
    }

    if (externalLink.includes("https://jgatenext.com")) {
      const newBaseUrl = "https://jgatenext-com.baiu.remotlog.com";

      externalLink = externalLink.replace("https://jgatenext.com", newBaseUrl);
    }
    // alert(externalLink)
    window.open(externalLink, '_blank');
  };
  return (
    <div>
      <TopBarWithoutLogout />
      <div className="container mx-auto px-4 m-4 flex flex-col">
        {/* Left side */}
        <div className="text-header my-3 mx-5 text-black " dangerouslySetInnerHTML={{ __html: bookDetails.title }} ></div>

        <div className="flex ">
          <div className="flex flex-col w-1/2 px-5">

            {bookDetails.imageUrl ?
              <div className='w-[200px] h-[200px] flex justify-center items-center '>

                <img
                  src={bookDetails.imageUrl}
                  alt={bookDetails.title}
                  className="w-[200px] h-[200px]  mt-2  "
                />
              </div>
              :
              <div className='w-[200px] h-[200px] flex justify-center items-center my-3'>
                <div className='w-[200px] h-[200px] bg-gray-100 flex text-center justify-center items-center'>
                  No thumbnail available
                </div>
              </div>}
            {/* {bookDetails.size && <div className='my-3'><div className='text-subheader text-gray-400 font-medium '> Files</div>
              <hr className="mt-2 border-t-1 border-gray-100 " />
              <Link href="#" className="text-subheader text-primary no-underline hover:underline">{bookDetails.file} ({bookDetails.size})</Link>
            </div>}  */}
            <div className='my-3'>
              <button
                onClick={(e) => userSession ? handleClick(e, bookDetails.externalLink) : setIsLoginPopupOpen(true)}
                className={`w-[200px] cursor-pointer border-0   text-[18px]   mt-6  py-3 ${userSession ? 'bg-secondary text-white' : 'bg-gray-200 text-black'} rounded-md  `}

              >

                <span>View</span>
              </button>
              {!userSession && <div className='text-low mt-1 '>Please login to view</div>}

            </div>
            <div className='my-3'><div className='text-subheader text-gray-400 font-medium'> Publisher</div>
              <hr className="mt-2 border-t-1 border-gray-100 w-full" />
              <div className="text-subheader text-black line-clamp-3">{bookDetails.publisher}</div>
            </div>
            <div className='my-3'><div className='text-subheader text-gray-400 font-medium'> Document Type</div>
              <hr className="mt-2 border-t-1 border-gray-100 w-full" />
              <div className="text-subheader text-black line-clamp-3">{bookDetails.dtype}</div>
            </div>
          </div>
          <div className="flex flex-col mt-3 w-1/2  px-5">
            {bookDetails.description !== "N/A" && (
              <div className='my-3'>
                <div className='text-subheader text-gray-400 font-medium'>Abstract</div>
                <hr className="mt-2 border-t-1 border-gray-100 w-full" />
                <div className={`text-subheader text-black ${showFullDescription ? '' : 'line-clamp-3'}`} dangerouslySetInnerHTML={{ __html: bookDetails.description }}></div>
                {bookDetails.database != "koha" && (
                  <button
                    className="text-blue-500 underline mt-2 bg-transparent border-0 cursor-pointer"
                    onClick={toggleDescription}
                  >
                    {showFullDescription ? "collapse" : "view_more"}
                  </button>)}
              </div>
            )}
            <div className='my-3'><div className='text-subheader text-gray-400 font-medium '> Date</div>
              <hr className="mt-2 border-t-1 border-gray-100 w-full" />
              <div className="text-subheader text-black line-clamp-3">{bookDetails.date}</div>
            </div>

            <div className='my-3'><div className='text-subheader text-gray-400 font-medium'> Authors</div>
              <hr className="mt-2 border-t-1 border-gray-100 w-full" />
              <div className="text-subheader text-black line-clamp-3">{bookDetails.author}</div>
            </div>

          </div>


        </div>
      </div>


      <Footer />
    </div >
  );
};

export default Details;
