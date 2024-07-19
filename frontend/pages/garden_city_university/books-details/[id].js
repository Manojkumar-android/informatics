// pages/book-details/[id].js
import { useRouter } from 'next/router';
import TopBarWithoutLogout from '../components/topbarwithoutlogout';
import SecondTopBar from '../components/secondtopbar';
import YouMayAlsoLike from '../components/youmayalsolike';
import Footer from '../components/footer';

const BookDetails = () => {
    const router = useRouter();
    const { id } = router.query;
  
    // Dummy data for demonstration (replace with actual data fetching logic)
    const book = {
      id: 1,
      title: 'Microcontrollers',
      subtitle: 'Fundamentals and Applications with PIC',
      author: 'Fernando E. Valdés Pérez, Fernando E. Valdes-Perez, and Ramon Pallas-Areny',
      imageUrl: '/micro1.png',
      edition: 'An edition of Microcontrollers (2023)',
      rating: 4.5,
      wantToRead: 10,
      currentlyReading: 23,
      haveRead: 80,
      description: 'Embark on a comprehensive journey through the world of microcontrollers with "Mastering Microcontrollers: From Basics to Advanced Applications." This definitive guide is designed for both beginners and seasoned engineers, offering a clear and concise introduction to microcontrollers and their myriad applications. Lorem ipsum dolor sit amet consectetur. Eleifend bibendum tortor netus adipiscing egestas. Cursus laoreet in faucibus vestibulum leo at etiam. Facilisis vivamus velit nunc aliquet imperdiet. Viverra aliquet malesuada non posuere. Placerat sollicitudin sit dignissim elementum. Dolor nullam id morbi mauris bibendum risus sit. Ac praesent molestie nisi pharetra turpis nec nulla. A ultrices amet gravida tempor pharetra lectus rhoncus. Et tristique pulvinar eget sollicitudin posuere nulla integer sed. Eu morbi et fusce sit feugiat condimentum. Sit maecenas ante at ut sapien mauris. Mi egestas gravida dignissim at sed. Viverra ut aliquam ullamcorper suspendisse posuere arcu volutpat porttitor eros. Et scelerisque elit integer eu quam varius odio. Egestas urna eget ornare sed tellus eu etiam. Justo lorem mattis sagittis a nunc accumsan etiam. Urna vitae posuere elit condimentum tristique sociis nibh at enim. Eget in luctus adipiscing habitasse pharetra enim dolor consectetur. Nunc feugiat id urna tortor erat volutpat. Semper aliquet fringilla morbi aliquam magna justo. Velit sed odio nulla fames tincidunt mauris praesent sed. Lectus dignissim neque tellus feugiat. Mattis amet mi ultrices sed sed ut dui. Eget orci massa porttitor sit velit. Adipiscing varius risus facilisis morbi risus venenatis in mauris. Vestibulum facilisis aliquam id nibh diam iaculis. Eu nascetur in scelerisque consectetur orci. Orci nulla morbi felis tortor vestibulum lobortis velit. Nunc eget massa mauris in quisque odio tellus ac. Pharetra justo facilisis auctor quisque platea sagittis. Enim quis sed vulputate tincidunt malesuada nibh at at proin. Accumsan eget arcu aliquam diam cursus eu suscipit dignissim. Condimentum sed tincidunt purus sagittis. Dignissim justo ultricies arcu elementum augue erat id tincidunt venenatis. Et auctor varius orci in vestibulum consequat. Nisl pulvinar facilisis orci nibh praesent nibh pharetra morbi. Sed commodo leo molestie pellentesque sollicitudin dolor risus adipiscing. At vulputate eleifend ac pretium ultrices. Platea netus orci bibendum leo neque lorem ornare commodo. Pellentesque sem eu duis velit at ullamcorper. At morbi justo aliquam turpis egestas viverra.',
    };

    const recommendedBooks = [
        { id: 5, title: 'Advanced Microcontrollers', imageUrl: '/youmaylike1.png' },
        { id: 6, title: 'Microcontroller Projects', imageUrl: '/youmaylike2.png' },
        { id: 7, title: 'PIC Microcontrollers', imageUrl: '/youmaylike3.png' },
        { id: 8, title: 'Embedded Systems', imageUrl: '/youmaylike4.png' },
        { id: 9, title: 'Embedded Systems', imageUrl: '/youmaylike5.png' },
      ];
  
      return (
        <div>
          <TopBarWithoutLogout />
          <SecondTopBar />
          <div className="container mx-auto px-4 mt-4 flex">
            {/* Left side */}
            <div className="flex flex-col items-center mr-8 mt-8"> {/* Adjusted margin-top here */}
              <img src={book.imageUrl} alt={book.title} className="w-[150.96px] h-[237px] object-cover" />
              <button className="bg-purple-800 w-[190px] h-[48px] text-white mt-6 px-4 py-2 rounded"> {/* Increased margin-top here */}
                View Publisher
              </button>
            </div>
            {/* Middle content */}
            <div className="flex-1">
              <p className="text-lg mt-4 text-gray-700">{book.edition}</p>
              <h1 className="text-4xl font-semibold mt-2">{book.title}</h1>
              <h2 className="text-2xl text-gray-700 mt-2">{book.subtitle}</h2>
              <p className="text-xl text-gray-500 mt-2 underline">{book.author}</p>
              <div className="text-base mt-4 text-gray-700">
                ★ {book.rating} stars | {book.wantToRead} want to read | {book.currentlyReading} currently reading | {book.haveRead} have read
              </div>
              <p className="text-base mt-4 text-gray-700">{book.description}</p>
              {/* New "Want to Read" button */}
              <button className="bg-purple-800 text-white w-[360px] h-[48px] mt-6 px-4 py-2 rounded-lg">
                Want to Read
              </button>
            </div>
          </div>
          <YouMayAlsoLike recommendedBooks={recommendedBooks} />
          <Footer />
        </div>
      );
    };
    
    export default BookDetails;