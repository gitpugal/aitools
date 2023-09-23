import { LucideHome } from "lucide-react";
import Link from "next/link";
import React from "react";

const CustomBreadCrumb = ({ crumbs }: { crumbs: any }) => {
  return (
    <div className="flex w-3/4 flex-row gap-2 mb-10 items-center justify-start">
      <Link href="/" className="flex text-xs lg:text-xl font-semibold  text-pink-500 items-center justify-center gap-1">
        <LucideHome className="inline my-auto" /> Home
      </Link>
      {crumbs.length > 0 &&
        crumbs.map((route, index) => (
          <>
            <Link className="text-xs lg:text-xl font-semibold" href={`/${crumbs[index - 1] || ""}/${route}`}>{route}</Link>
            {index != crumbs.length - 1 && (
              <p className="text-3xl font-extrabold font-mono text-pink-500">&gt;</p>
            )}
          </>
        ))}
    </div>
  );
};

export default CustomBreadCrumb;
