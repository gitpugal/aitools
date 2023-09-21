import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { SessionProvider, getProviders } from "next-auth/react";
import { DropdownMenuDemo } from "./HamBurger";
import { useEffect } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export default function Navbar() {
  const session = useSession();
  const [navDrop, setNavDrop] = useState(false);

  useEffect(() => {
    console.log(session?.data);
  }, [session?.status]);

  return (
    <div className="bg-white border-b-[0.01px] flex flex-row relative  justify-between px-10 lg:px-40  py-3 border-pink-500 shadow-md text-black">
      <div className="hidden lg:flex   items-center flex-row gap-5 text-sm font-light">
        <a
          href="/"
          className="text-2xl lg:relative lg:left-0 absolute left-1/2 lg:-translate-x-0 -translate-x-1/2 font-light"
        >
          AITOOLSNEXT.COM
        </a>
        <a href="/categories" className="cursor-pointer">
          Categories
        </a>
        <a href="/tools" className="cursor-pointer">
          Tools
        </a>
        <a href="/deals" className="cursor-pointer">
          Best Deals
        </a>
      </div>
      {session?.data?.user?.email && (
        <div className="bg-black overflow-hidden cursor-pointer h-10 w-10 rounded-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {session?.data?.user?.image && (
                <Avatar>
                  <AvatarImage src={session?.data?.user?.image} />
                  <AvatarFallback>
                    {session?.data?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{session?.data?.user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {session?.data?.user?.email && (
                  <DropdownMenuItem>
                    {session?.data?.user?.email}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full h-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
