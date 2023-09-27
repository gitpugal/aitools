import { LucideHome } from "lucide-react";
import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const CustomBreadCrumb = ({ crumbs }: { crumbs: any }) => {
  return (
    <div className="flex w-3/4 flex-row  mb-10 items-center justify-start">
      <Link
        href="/"
        className="flex text-xs lg:text-xl font-semibold  text-pink-500 items-center justify-center gap-1"
      >
        <LucideHome className="inline my-auto" /> Home
      </Link>
      {crumbs.length > 0 &&
        crumbs.map((route, index) => (
          <>
            <Link
              className="text-xs hover:text-pink-500 lg:text-xl font-semibold"
              href={`/${crumbs[index - 1] || ""}/${route}`}
            >
              {route}
            </Link>
            {index != crumbs.length - 1 && (
              <p className="text-2xl flex items-center justify-center h-10 my-auto relative top-1 w-10 font-extrabold font-mono text-pink-500">
                <IoIosArrowForward />
              </p>
            )}
          </>
        ))}
    </div>
  );
};

export default CustomBreadCrumb;
