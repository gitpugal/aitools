import Link from "next/link";
import { useState, useEffect } from "react";
// import {
//   import {
//     Calculator,
//     Calendar,
//     CreditCard,
//     Settings,
//     Smile,
//     User,
//   } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../components/ui/command";

export function SearchBar() {
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
    <div className="">
      

      <input
        type="search"
        name="searchBar"
        value={searchTerm}
        id="search"
        placeholder="search tools and categories..."
        className="bg-gray-100 p-5 rounded-xl w-[30vw]"
        onChange={changeHandler}
      />
      {searchresults.length > 0 && (
        <div className="flex flex-col gap-2 bg-gray-50 py-5 px-2 mt-5 rounded-md w-[50vw] max-h-fit min-h-fit">
          {searchresults.length > 0 && (
            <p className="font-bold text-2xl">Tools:</p>
          )}{" "}
          {searchresults.map((result) => (
            <Link
              href={`/tools/result.id`}
              key={result.id}
              className="w-full text-le bg-gray-100 text-sm  rounded-md font-bold  py-2"
            >
              {result.name}
            </Link>
          ))}
          <br />
          {searchCatresults.length > 0 && (
            <p className="font-bold text-2xl">Categories:</p>
          )}{" "}
          {searchCatresults.map((result) => (
            <Link
              href={`/categories/${result.id}`}
              key={result.id}
              className="w-full text-le bg-gray-100 text-sm  rounded-md font-bold  py-2"
            >
              {result.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
