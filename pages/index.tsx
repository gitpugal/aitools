import React, { useState } from 'react';
import { IoIosSearch, IoIosArrowForward } from 'react-icons/io';
import axios from 'axios';

export const isMobile = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile;
};


const Home = ({ categories }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSearch = () => {
    // Handle search logic here
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {/* Your existing content here */}

      <div className="flex items-center bg-white rounded-lg px-2 py-2">
        <input
          type="text"
          placeholder="Search"
          className="appearance-none bg-transparent border-none px-1 text-gray-900 placeholder-gray-500 focus:outline-none"
          style={{ minWidth: isMobile ? '250px' : '450px' }}
        />
        <button
          type="button"
          className="flex-shrink-0 bg-gray-500 hover:bg-blue-500 py-2 px-3 pr-2 rounded-r-lg font-semibold -m-2 transition-colors duration-200"
          onClick={handleSearch}
        >
          <IoIosSearch size={30} className="text-white hover:text-white" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-8">
        <div className="flex flex-wrap">
          {categories.map(category => (
            <a
              key={category.id}
              className="badge flex items-center m-1 justify-center bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-1.5 rounded-lg hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
              href={'#'}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {category?.name}
              {/* {isHovered && <IoIosArrowForward className="arrow-icon ml-1" />} */}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8">
        <div className="flex flex-wrap">
          <h1> Tools List </h1>
        </div>
      </div>

    </main>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get('http://api.aitoolsnext.com/getCategories');
    const categories = response.data;
    return {
      props: {
        categories,
      },
    };
  } catch (error) {
    console.log('Error fetching categories:', error);
    return {
      props: {
        categories: [],
      },
    };
  }
}

export default Home;
