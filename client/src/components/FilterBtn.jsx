import { useState } from 'react';
import { GoChevronDown } from "react-icons/go";

const FilterBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Filter By:');

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    console.log('Selected filter:', filter);
    setIsOpen(false); // Close the dropdown after selection
    // Add additional logic here to filter your data
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-3xl border border-none shadow-lg px-4 py-2 bg-card-bg backdrop-blur-lg  text-sm font-medium text-color-dark  hover:bg-primary focus:outline-none   "
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedFilter}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns=<GoChevronDown/>
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06 0L10 10.44l3.71-3.23a.75.75 0 111.06 1.06l-4.25 3.5a.75.75 0 01-1.06 0l-4.25-3.5a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-30  rounded-2xl shadow-lg bg-bg-customBg  ring-black ring-opacity-5 items-center">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              className="block px-4 py-2 text-sm text-black hover:rounded-lg w-full text-left"
              onClick={() => handleFilterClick('Latest')}
            >
              Latest
            </button>
            <button
              className="block px-4 py-2 text-sm text-black hover:rounded-lg w-full text-left"
              onClick={() => handleFilterClick('Oldest')}
            >
              Oldest
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBtn;
