"use client";
import { useSession, signOut } from "next-auth/react";
import { DropdownMenuDemo } from "./HamBurger";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useToast } from "../components/ui/use-toast";
import Link from "next/link";
import Pageres from "pageres";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { cn } from "../lib/utils";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
export default function Navbar() {
  const { toast } = useToast();
  const [openAddToolDialog, setOpenAddToolDialog] = useState(false);
  const [toolName, setToolName] = useState("");
  const [toolDescription, setToolDescription] = useState("");
  const [toolFeatures, setToolFeatures] = useState("");
  const [toolPricing, setToolPricing] = useState("");
  const [toolUpvotes, setToolUpvotes] = useState("");
  const [toolImageUrl, setToolImageUrl] = useState("");
  const [toolURL, settoolURL] = useState("");
  const [toolSlug, setToolSlug] = useState("");
  const pricingOptions = ["Free", "Premium"];
  const [isLoading, setIsLoading] = useState(false);

  const session = useSession();
  const handleCloseAddToolDialog = () => {
    if (session?.data?.user?.email != null) {
      setOpenAddToolDialog((prev) => !prev);
    } else {
      setOpenAddToolDialog(false);

      document.getElementById("modal").style.visibility = "visible";
      document.getElementById("contain").style.opacity = "0.07";
      document.getElementById("contain").style.pointerEvents = "none";
    }
  };

  const handleAddToolChange = (content, delta, source, editor) => {
    setToolDescription(editor.getHTML());
  };

  const handleSaveTool = async () => {
    if (toolName === null || toolName === "" || !toolName) {
      return "No Tools Found.";
    }
    if (session?.data?.user?.email == null) {
      return "No user Found!";
    }

    if (
      toolDescription === null ||
      toolDescription === "" ||
      !toolDescription
    ) {
      return "No Tools Description Found.";
    }
    setIsLoading(true);

    const toolsData = {
      name: toolName,
      description: toolDescription,
      features: toolFeatures,
      pricing: toolPricing,
      upvotes: 0,
      imageURL: toolImageUrl,
      slug:
        toolName.replaceAll(" ", "-") +
        "-" +
        Math.round(Math.random() * 1000).toString(),
      user: session?.data?.user?.email,
    };

    console.log(JSON.stringify(toolsData));
    const response = await fetch("https://aitoolsnext.com/api/addTool", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toolsData),
    });

    if (!response.ok) {
      const data = await response.json();
      toast({
        title: data?.message?.replace("Key ", ""),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    } else {
      toast({
        title: "Tool Created successfully!",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
      setOpenAddToolDialog(false);
    }
    setIsLoading(false);
  };

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
        <Dialog
          open={openAddToolDialog}
          onOpenChange={handleCloseAddToolDialog}
        >
          <DialogTrigger className="">Add Tool</DialogTrigger>
          <DialogContent className="flex flex-col justify-start items-start gap-5">
            <DialogTitle>Add Tool</DialogTitle>
            <>
              <Label htmlFor="toolName" className="text-left">
                Name
              </Label>
              <Input
                id="toolName"
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                className=""
              />
            </>
            <>
              {" "}
              <Label htmlFor="Description" className="text-left">
                Description
              </Label>
              <ReactQuill
                value={toolDescription}
                onChange={handleAddToolChange}
              />
            </>
            <>
              {" "}
              <Label htmlFor="Features" className="text-left">
                Features
              </Label>
              <Input
                id="toolFeatuers"
                value={toolFeatures}
                onChange={(e) => setToolFeatures(e.target.value)}
              />
            </>
            <>
              {" "}
              <Label htmlFor="URL" className="text-left">
                URL
              </Label>
              <Input
                id="toolURL"
                value={toolURL}
                onChange={(e) => settoolURL(e.target.value)}
              />
              <button
                onClick={async () => {
                  await new Pageres({ delay: 2 })
                    .source("https://github.com/sindresorhus/pageres", [
                      "1280x1024",
                      "1920x1080",
                    ])
                    .destination("images")
                    .run();
                }}
              >
                save image
              </button>
            </>
            <>
              {" "}
              <Label htmlFor="pricing" className="text-left">
                Pricing
              </Label>
              {/* <select onChange={(e) => setToolPricing(e.target.value)}>
                {pricingOptions.map((option) => (
                  <Optio key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select> */}
              <Select name="pricing" onValueChange={(e) => setToolPricing(e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={"Select pricing"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
            <DialogFooter>
              <Button onClick={handleCloseAddToolDialog}>Cancel</Button>
              <Button onClick={handleSaveTool} disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {session?.data?.user?.email && (
        <div className="flex flex-row items-center justify-center gap-5">
          {/* <Image width={100} height={100} alt="profile" src={session?.data?.user?.image} /> */}

          <div className="bg-black overflow-hidden cursor-pointer h-10 w-10 rounded-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {session?.data?.user?.image && (
                  <Avatar className="h-full w-full">
                    <AvatarImage
                      className="h-full w-full object-contain"
                      src={session?.data?.user?.image}
                    />
                    <AvatarFallback>
                      {session?.data?.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  {session?.data?.user?.name}
                </DropdownMenuLabel>
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

// export const getServerSideProps = async () => {
//   const Pageres = await import("pageres");

//   return {
//     props: {
//       Pageres, // will be passed to the page component as props
//     },
//   };
// };
