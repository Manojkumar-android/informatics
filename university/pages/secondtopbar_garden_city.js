import { useState, useContext } from 'react';
import SearchContext from '../contexts/search/searchContext';
import DatabaseContext from "../contexts/search/databaseContext";
import PublisherContext from '../contexts/search/publisherContext';
import ItemTypeContext from '../contexts/search/itemTypeContext';
const SecondTopBar = () => {

  const { term, setTerm, search, loading } = useContext(SearchContext);
  const { database, setDatabase, selected, setSelected } = useContext(DatabaseContext);
  const { handlePublisherResponse, clearPublisherValues } = useContext(PublisherContext);
  const { handleItemTypeResponse, clearItemTypeValues } = useContext(ItemTypeContext);
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

    if (term == "" && loading) return;
    e.preventDefault();

    search();

  }
  const checkAllDatabse = () => {
    if (loading) return;
    const updatedValues = database.values.map(item => ({
      ...item,
      checked: true
    }));

    setDatabase(prevState => ({
      ...prevState,
      values: updatedValues
    }));
    let updatedDatabase = {
      ...database,
      values: updatedValues
    };
    return updatedDatabase
  };
  const handleButtonChange = (label, e) => {
    if (loading) return;

    if (label == "All") {
      const updatedDatabase = checkAllDatabse()
      search(updatedDatabase, "database")

    } else if (label == "OA") {
      setDatabase((prevState) => ({
        ...prevState,
        values: prevState.values.map((option) =>
          option.label === "DSpace"
            ? { ...option, checked: true }
            : { ...option, checked: false }
        ),
      }));
      let updatedDatabase = {
        ...database,
        values: database.values.map((option) =>
          option.label === "DSpace"
            ? { ...option, checked: true }
            : { ...option, checked: false }
        ),
      };
      search(updatedDatabase, "database")

    } else if (label == "Periodicals") {
      setDatabase((prevState) => ({
        ...prevState,
        values: prevState.values.map((option) =>
          option.label === "J-Gate"
            ? { ...option, checked: true }
            : { ...option, checked: false }
        ),
      }));
      let updatedDatabase = {
        ...database,
        values: database.values.map((option) =>
          option.label === "J-Gate"
            ? { ...option, checked: true }
            : { ...option, checked: false }
        ),
      };
      search(updatedDatabase, "database")

    } else if (label == "Library Books") {
      setDatabase((prevState) => ({
        ...prevState,
        values: prevState.values.map((option) =>
          option.label === "Koha"
            ? { ...option, checked: true }
            : { ...option, checked: false }
        ),
      }));
      let updatedDatabase = {
        ...database,
        values: database.values.map((option) =>
          option.label === "Koha"
            ? { ...option, checked: true }
            : { ...option, checked: false }
        ),
      };
      search(updatedDatabase, "database")

    }

    setSelected(label)
  }
  return (
    <div className="bg-gray-100 text-black flex flex-col items-center space-y-4 p-4">
      <div className="flex space-x-4">
        {buttons.map(button => (
          <button
            key={button}
            onClick={(e) => handleButtonChange(button, e)}
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

