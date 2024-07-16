import Link from 'next/link';

const TopBar = () => {
  return (
    <div className="bg-white text-black flex justify-between h-[100px] items-center p-4">
      {/* Left Logo */}
      <div className="flex items-center">
        <img src="/college logo.png" alt="Logo" className="h-[50px] w-[193.42px] mr-2" />
      </div>

      {/* Middle Links */}
      <div className="flex space-x-5">
        <Link href="/e-resources" className="hover:text-gray-400">
          E-resources
        </Link>
        <Link href="/search" className="hover:text-gray-400">
          Search
        </Link>
        <Link href="/browse" className="hover:text-gray-400">
          Browse
        </Link>
        <Link href="/about" className="hover:text-gray-400">
          About
        </Link>
        <Link href="/contact" className="hover:text-gray-400">
          Contact
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center">
        <div
          className=" hover:bg-red-200 text-[#EF4444] font-bold py-2 px-4 rounded"
          onClick={() => window.location.href = 'http://localhost:3000'}
        >
          <span className=''>Logout</span>  </div>
          <img
                        src="/logout logo.png"
                        width={20}
                        height={20}
                        alt="Logout"
                    />            
          
        <img src="/info logo.png" alt="Logo" className="h-[48px] w-[190.35px] ml-4" />
      </div>
    </div>
  );
};

export default TopBar;
