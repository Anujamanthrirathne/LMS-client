import React from 'react';
import "./Loader.css"; // Make sure to include the CSS file

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
