import { useState } from 'react';
import PropTypes from 'prop-types';
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ onSearch }) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex justify-center mb-4 items-center ">
      <div className="relative w-full max-w-md rounded-3xl flex items-center shadow-md bg-card-bg bg-opacity-35 backdrop-blur-sm border-none">
        <input
          type="text"
          placeholder="search by patient id or name here..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full px-4 py-2 pr-10 border text-white border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-card-bg bg-opacity-35 backdrop-blur-sm border-none text-sm"
        />
        <button
          type="button"
          className="absolute right-2 text-white hover:text-gray-400 focus:outline-none flex items-center justify-center pr-2 font-extrabold text-2xl"
          onClick={handleSearch}
        >
          <CiSearch />
        </button>
      </div>
    </div>
  );
};


export default SearchBar;