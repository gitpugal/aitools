import { useEffect, useState } from "react";
import Head from "next/head";
import Footer from "../components/footer";
import CardList from "../components/CardList";
import { SearchBar } from "../components/SearchBar";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { FaSpinner } from "react-icons/fa";
import CustomForm from "../components/CustomForm";
import Image from "next/image";
// import type { Metadata } from "next";

export const metadata = {
  title: "SEO TITLE",
  description: "seonjwkehaljw;kdsfgvsawhqj",
};
export default function Home({ categoriess, toolss, toolCount }) {
  function authHandler() {
    document.getElementById("container").style.pointerEvents = "none";
    document.getElementById("container").style.filter = "blur(5px)";
    document.getElementById("modal").style.visibility = "visible";
  }
  const [providers, setProviders] = useState<ClientSafeProvider[]>([]);
  const [searchResults, setSearchResults] = useState([]);
  const [LoadMorePosts, setLoadMorePosts] = useState(false);
  const [categories, setcategories] = useState([]);
  const [tools, settools] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [itemCount, setItemCount] = useState(toolCount);

  function handleSearchSubmit(searchresult) {
    setSearchResults(searchresult);
  }

  const fetchData = async () => {
    const providerData = await getProviders();
    const providerArray = Object.values(providerData);
    settools(toolss);
    setcategories(categoriess);
    setProviders(providerArray);
    setItemCount(toolCount);
  };

  useEffect(() => {
    fetchData();
    window?.addEventListener("scroll", handleMouseScroll);
  }, []);

  const handleMouseScroll = (event) => {
    if (
      window.innerHeight + event.target.documentElement.scrollTop + 1 >=
      event.target.documentElement.scrollHeight
    ) {
      setLoadMorePosts(true);
    } else {
      setLoadMorePosts(false);
    }
  };

  useEffect(() => {}, [LoadMorePosts]);

  async function fetchMorePosts() {
    setIsFetching(true);
    const toolsResponse = await fetch("http://localhost:3000/api/topTools", {
      method: "POST",
      body: JSON.stringify({ currentIndex: tools.length, itemCount: 10 }),
    });
    const topTools = await toolsResponse.json();
    settools((prev) => [...prev, ...topTools?.tools]);
    setIsFetching(false);
  }

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

      <div className="w-screen overflow-hidden text-center py-20">
        <h1 className="lg:text-6xl text-3xl font-light mb-10">
          Find Best AI Tools to{" "}
          <span className="block py-3 text-3xl font-bold bg-gradient-to-r from-pink-400 lg:text-7xl to-purple-700 bg-clip-text h-fit   text-transparent">
            Simplify your tasks.
          </span>
        </h1>
        <CustomForm />
        <SearchBar handleSearchSubmit={handleSearchSubmit} />
        <div className="lg:text-left px-5 w-full flex flex-row flex-wrap justify-center  my-10  gap-1 mx-auto lg:w-1/2 text-center">
          {categories != null &&
            categories?.slice(0, 18)?.map((category) => (
              <a
                className="px-4 py-2 hover:scale-105 transition-all flex items-center justify-center hover:shadow-pink-500 ease-in-out hover:-translate-y-1 hover:shadow-sm bg-black text-white rounded-xl shadow-sm"
                href={`/${category?.slug}-ai-tools`}
              >
                {category?.name}
              </a>
            ))}

          <a
            className=" text-white bg-gradient-to-br from-purple-600 to-pink-500 overflow-hidden p-[3px] rounded-xl shadow-sm"
            href={`/categories`}
          >
            <p className="bg-black rounded-xl px-4 py-2 ">show more</p>
          </a>
        </div>
        <div className="w-fit h-fit bg-red-400">
          <Image
            width={1000}
            height={1000}
            src="https://gitlab.com/aitoolsnext/aitoolsnext-web/-/raw/main/images/grid.png"
            alt="Test Image"
          />
        </div>
        {/* </Stack> */}
        {searchResults.length > 0 ? (
          <div>
            <div className=" mb-10 mt-20">
              <h1 className="text-3xl lg:text-5xl font-bold text-black animate-bounce">
                Search Results
              </h1>
              <a
                onClick={() => setSearchResults([])}
                className="mt-10 cursor-pointer underline text-xl text-pink-500"
              >
                clear search results
              </a>
            </div>
            <CardList
              key={JSON.stringify(searchResults)}
              isCategory={false}
              authHandler={authHandler}
              tool={searchResults}
            />
          </div>
        ) : (
          <CardList isCategory={false} authHandler={authHandler} tool={tools} />
        )}
        {tools.length < itemCount && (
          <Button
            onClick={fetchMorePosts}
            className=" h-10 w-40 py-8  text-2xl my-10"
          >
            {isFetching ? <FaSpinner className="animate-spin" /> : "Load More"}
          </Button>
        )}
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/getCategories");
  const categoriess = await response.json();

  const toolsResponse = await fetch("http://localhost:3000/api/topTools", {
    method: "POST",
    body: JSON.stringify({ currentIndex: 0, itemCount: 10 }),
  });
  const topTools = await toolsResponse.json();
  console.log(topTools);
  const toolss = topTools?.tools ? topTools.tools : [];
  const toolCount = topTools?.toolCount[0].count;
  return {
    props: {
      categoriess,
      toolss,
      toolCount,
    },
  };
}
