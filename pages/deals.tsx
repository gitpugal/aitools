import { useState } from 'react';
import Head from 'next/head';



export default function Home() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div>
      <Head>
        <title>AIToolsNext - Find Best AI tools to
          simplify your task and make your work easy</title>
        <meta name="description" content="Discover the best AI tools directory with reviews and alternative options in multiple categories like text, video, and images. Find the right AI tools for your specific needs and enhance your productivity." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      

     <div className='flex items-center justify-center p-20'>
      <h1 className='text-3xl'>
        Coming soon!!!
      </h1>
     </div>
      
    </div>
  );
}

// export async function getServerSideProps() {

//   const toolsResponse = await fetch('https://www.aitoolsnext.com/api/topTools');
//   const topTools = await toolsResponse.json();
//   const tools = topTools?.tools ? topTools.tools : [];

//   return {
//     props: {
//       tools
//     },
//   };
// }
