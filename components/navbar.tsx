import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { SessionProvider, getProviders } from "next-auth/react";
import { DropdownMenuDemo } from "./HamBurger";
import { useEffect } from "react";

export default function Navbar() {
  const session = useSession();
  const [navDrop, setNavDrop] = useState(false);

  useEffect(() => {
    console.log(session?.data);
  }, [session?.status]);

  return (
    <div className="bg-white border-b-[0.01px] flex flex-row relative  justify-between lg:px-40 p-5 border-pink-500 shadow-md text-black">
      <div className="hidden lg:flex   items-center flex-row gap-5 text-lg font-semibold">
        <a
          href="/"
          className="text-2xl lg:relative lg:left-0 absolute left-1/2 lg:-translate-x-0 -translate-x-1/2 font-light"
        >
          AITOOLSNEXT.COM
        </a>
        <a href="categories" className="cursor-pointer">
          Categories
        </a>
        <a href="tools" className="cursor-pointer">
          Tools
        </a>
        <a href="deals" className="cursor-pointer">
          Best Deals
        </a>
      </div>
      {session?.data?.user?.email && (
        <button
          onClick={() => signOut()}
          className="bg-black px-4 py-2 rounded-xl text-white"
        >
          SignOut
        </button>
      )}
      {!session?.data?.user?.email && (
        <button
          onClick={() => {
            document.getElementById("modal").style.visibility = "visible";
            document.getElementById("contain").style.opacity = "0.07";
            document.getElementById("contain").style.pointerEvents = "none";

            return;
          }}
          className="bg-black px-4 py-2 rounded-xl text-white"
        >
          Sign in
        </button>
      )}
      <div className="xs:flex lg:hidden">
        <DropdownMenuDemo />
      </div>
    </div>
  );
}
