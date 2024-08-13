import React, { useState } from 'react';

const FilterSortBar = ({ isGridView, handleGridViewToggle }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('latest');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <div className="flex items-center justify-between bg-white h-[60px] rounded-lg p-4 shadow-md">
      {/* Left Section: Checkbox and Select Button */}
      {/* <div className="flex items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <div className="bg-white p-2 rounded text-black cursor-pointer">
          Select
        </div>
      </div> */}

      {/* Center Section: Filter/Sort Options */}
      <div className="flex-grow text-end">
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className="bg-white border border-gray-300 mr-3 p-2 rounded-lg text-gray-700"
        >
          <option value="latest">Sort by: latest</option>
          <option value="date">Date</option>
          <option value="size">Size</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Right Section: Grid View Icon */}
      <div className="flex items-center">
        <svg
          onClick={handleGridViewToggle}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-gray-700 cursor-pointer"
        >
          {isGridView ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default FilterSortBar;
