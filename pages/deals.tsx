import { useEffect, useState } from "react";
import Head from "next/head";
import CustomBreadCrumb from "../components/CustomBreadCrumb";

export default function Home() {
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  useEffect(() => {
    setBreadCrumbs(window?.location?.pathname?.split("/"));
  }, []);
  return (
    <div>
      {/* <Head>
        <title>
          AIToolsNext - Find Best AI tools to simplify your task and make your
          work easy
        </title>
        <meta
          name="description"
          content="Discover the best AI tools directory with reviews and alternative options in multiple categories like text, video, and images. Find the right AI tools for your specific needs and enhance your productivity."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <div className="flex flex-col justify-center items-start py-10  px-3  sm:px-10 lg:px-40">
        <CustomBreadCrumb crumbs={breadCrumbs} />
        <h1 className="text-3xl w-full text-center">Coming soon!!!</h1>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {

//   const toolsResponse = await fetch('https://aitoolsnext.com/api/topTools');
//   const topTools = await toolsResponse.json();
//   const tools = topTools?.tools ? topTools.tools : [];

//   return {
//     props: {
//       tools
//     },
//   };
// }
