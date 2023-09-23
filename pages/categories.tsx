import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import CustomBreadCrumb from "../components/CustomBreadCrumb";

export default function Home({ categories }) {
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  useEffect(() => {
    setBreadCrumbs(window?.location?.pathname?.split("/"));
  });
  return (
    <div>
      <Head>
        <title>
          AIToolsNext - Find Best AI tools to simplify your task and make your
          work easy
        </title>
        <meta
          name="description"
          content="Discover the best AI tools directory with reviews and alternative options in multiple categories like text, video, and images. Find the right AI tools for your specific needs and enhance your productivity."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col justify-center items-start   px-3  sm:px-10 lg:px-40 py-10">
        <CustomBreadCrumb crumbs={breadCrumbs} />

        <h1 className="text-5xl w-full text-center">
          Find Best AI tools to
          <br />
          <span>simplify your task</span>
        </h1>

        <p className="text-xl w-full text-center mt-10">
          {" "}
          Please find the complete list of all the categories{" "}
        </p>
      </div>
      <div className="lg:text-left px-5 w-full flex flex-row flex-wrap justify-center  my-10  gap-1 mx-auto lg:w-1/2 text-center">
        {categories?.slice(0, 18)?.map((category) => (
          <Link
            className="px-4 py-2 hover:scale-105 transition-all hover:shadow-pink-500 ease-in-out hover:-translate-y-1 hover:shadow-sm bg-black text-white rounded-xl shadow-sm"
            href={`/categories/${category?.slug}`}
          >
            {category?.name}
          </Link>
        ))}

        <Link
          className=" text-white bg-gradient-to-br from-purple-600 to-pink-500 overflow-hidden p-[3px] rounded-xl shadow-sm"
          href={`/categories`}
        >
          <p className="bg-black rounded-xl px-4 py-2 ">show more</p>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch("https://www.aitoolsnext.com/api/getCategories");
  const categories = await response.json();
  return {
    props: {
      categories,
    },
  };
}
