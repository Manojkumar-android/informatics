import { useState, useContext } from 'react';
import SearchContext from '../contexts/search/searchContext';

const SecondTopBar = () => {
  const [selected, setSelected] = useState('All');

  const { term, setTerm, search } = useContext(SearchContext);

  const buttons = [
    'All',
    'Library Books',
    'Periodicals',
    'IR',
    'OA',
    'Thesis/Dissertations',
    'E-resources'
  ];
  const searchClick = async (e) => {

    if (term == "") return;
    e.preventDefault();

    search();

  }
  return (
    <div className="bg-gray-100 text-black flex flex-col items-center space-y-4 p-4">
      <div className="flex space-x-4">
        {buttons.map(button => (
          <button
            key={button}
            onClick={() => setSelected(button)}
            className={`px-4 py-2 rounded-xl ${selected === button ? 'bg-[#F58220] text-white border-0' : 'bg-white border-0'
              } hover:bg-orange-400`}
          >
            {button}
          </button>
        ))}
      </div>
      <form className='w-full ' onSubmit={searchClick}>
        <div className="flex items-center h-[60px] text-black bg-white rounded-lg shadow border-0">
          <input
            type="text"
            placeholder="Enter search items..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="flex-grow p-4 h-full rounded-l-lg outline-none border-0 text-subheader"
          />
          <button type='submit' className="bg-[#F58220] p-4 rounded-r-lg h-full border-0 cursor-pointer" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M18 11a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecondTopBar;

