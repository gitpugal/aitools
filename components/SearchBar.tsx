import Link from "next/link";
import { useState, useEffect } from "react";

export function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchresults, setsearchresults] = useState([]);
  const [searchCatresults, setsearchCatresults] = useState([]);

  function changeHandler(e) {
    e.preventDefault();
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.length > 0) {
      searchHandler(newSearchTerm);
    } else {
      setsearchresults([]);
      setsearchCatresults([]);
    }
  }

  async function searchHandler(term) {
    const res = await fetch("/api/searchHandler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: term }),
    });
    const data = await res.json();
    setsearchresults(data.message);
    setsearchCatresults(data.catResult);
  }

  useEffect(() => {
    if (searchTerm.length === 0) {
      setsearchresults([]);
      setsearchCatresults([]);
    }
  }, [searchTerm]);

  return (
    <div className="w-screen mt-24 mb-32 px-2 md:px-10">
      <div className="flex  mx-auto flex-row  gap-0 items-stretch justify-center">
        <input
          type="search"
          name="searchBar"
          value={searchTerm}
          id="search"
          placeholder="search tools and categories..."
          className="bg-gray-100  py-4  px-8 rounded-xl rounded-r-none border-r-0 w-full focus:outline-none lg:w-1/2 shadow-2xl border-[1px]"
          onChange={changeHandler}
        />
        <button
          onClick={() => {
            props.handleSearchSubmit(searchresults);
            setsearchresults([]);
            window.scrollBy({
              top: 350,
              behavior: "smooth",
            });
            setSearchTerm("");
          }}
          className="bg-black px-10 text-white  rounded-r-xl border-black border-2 font-light text-xl"
        >
          Search
        </button>
      </div>
      {searchresults.length > 0 && (
        <div className="flex flex-col gap-2 w-[57%] mx-auto bg-gray-50 py-5  z-50 px-2 mt-5 rounded-md  max-h-fit min-h-fit">
          {searchresults.length > 0 && (
            <p className="font-bold text-2xl text-left pl-3">Tools</p>
          )}{" "}
          {searchresults.map((result) => (
            <Link
              href={`/tools/${result.slug}`}
              key={result.id}
              className="w-full text-left px-10 bg-gray-100 text-lg  rounded-md font-light  py-3"
            >
              {result.name}
            </Link>
          ))}
          <br />
          {searchCatresults.length > 0 && (
            <p className="font-bold text-2xl">Categories</p>
          )}{" "}
          {searchCatresults.map((result) => (
            <Link
              href={`/categories/${result.slug}`}
              key={result.id}
              className="w-full text-left px-10 bg-gray-100 text-lg  rounded-md font-light  py-3"
            >
              {result.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
