import React, { useState } from 'react';
import { IoIosSearch, IoIosArrowForward } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive'; // Update the import statement
import axios from 'axios';

export const isMobile = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile;
};

type HomeProps = {
  categories: Array<any>; // Update the type to match your actual data structure
};

const Home = () => {
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
     <h1> Hello World. </h1>

    </main>
  );
};


export default Home;
