// components/ViewAll.js
import React from 'react';

const ViewAll = ({ onClick }) => {
  return (
    <div className="text-right">
      <div
        onClick={onClick}
        className="text-blue-700 underline hover:text-blue-800 focus:outline-none"
      >
        View All
      </div>
    </div>
  );
};

export default ViewAll;
