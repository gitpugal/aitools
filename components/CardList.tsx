import React, { useEffect, useState } from "react";
import Image from "next/image";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { BiSolidUpArrow } from "react-icons/bi";
import { Loader2 } from "lucide-react";

const CardList = ({ tool, authHandler, isCategory }) => {
  const [isLoading, setIsLoading] = React.useState("");
  const [tools, setTools] = React.useState(tool);
  const [isLoaded, setisLoaded] = useState(false);
  const session = useSession();

  async function initiateLike(id, email, isLiked) {
    setIsLoading(id);
    if (!session?.data?.user) {
      document.getElementById("modal").style.visibility = "visible";
      document.getElementById("contain").style.visibility = "hidden";
    } else {
      try {
        const res = await fetch("/api/likeHandler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, email: email, isLiked: isLiked }),
        });
        console.log(res);
        if (res.status < 300) {
          setTools((prev) =>
            prev.map((ele) => {
              if (ele.id == id) {
                isLiked ? (ele.upvotes -= 1) : (ele.upvotes += 1);
                ele.upvotedusers = email;
              }
              return ele;
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    }

    setIsLoading("");
  }
  useEffect(() => {
    setisLoaded(true);
  });
  return (
    <div className="w-screen items-stretch px-3 mt-20 sm:px-10 lg:px-40 gap-5 lg:gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {tools?.map((tool) => (
        <div className="lg:hover:bg-gradient-to-tr border-[1px] border-slate-300 w-full lg:hover:p-1  bg-black lg:hover:from-purple-600 shadow-2xl  rounded-3xl lg:hover:to-pink-500">
          <div className="w-full h-full hover:shadow-none transition-all ease-in-out  cursor-pointer mx-auto  rounded-3xl flex flex-col  overflow-hidden">
            <Link
              aria-label="Tool Image"
              data-splitbee-event="Premium Card Open"
              data-splitbee-event-tool="Taplio"
              href={`/tools/${tool?.slug}`}
              className="h-full bg-black flex-1 object-contain bg-cover"
            >
              <Image
                src="/tools/taplio.webp"
                alt="Tool Image"
                width={500}
                height={281}
                className=" w-full"
              />
            </Link>
            <div className="bg-gradient-to-tl from-black to-slate-700 flex-1 cursor-default p-0 gap-3 text-white flex flex-col mt-0 text-left px-10 py-10 min-w-full max-w-full  ">
              <div className="flex flex-row justify-between">
                <p className="text-3xl font-semibold">
                  {tool?.name?.charAt(0).toUpperCase() +
                    tool?.name?.substr(1).toLowerCase()}
                </p>
                {!isCategory && (
                  <div>
                    <p
                      className={` px-4 py-2 cursor-pointer rounded-xl ${
                        tool?.upvotedusers != null &&
                        tool?.upvotedusers?.indexOf(
                          session?.data?.user?.email
                        ) >= 0
                          ? "bg-white text-black"
                          : "bg-[#4c4c4c]"
                      }  flex items-center justify-center`}
                      onClick={() => {
                        const useremail = session?.data?.user?.email;
                        if (!useremail) {
                          document.getElementById("modal").style.visibility =
                            "visible";
                          document.getElementById("contain").style.opacity =
                            "0.07";
                          document.getElementById(
                            "contain"
                          ).style.pointerEvents = "none";

                          return;
                        }

                        const updatedUpvotedUsers = tool?.upvotedusers
                          ? tool.upvotedusers.includes(useremail)
                            ? tool.upvotedusers.filter(
                                (email) => email !== useremail
                              )
                            : [...tool.upvotedusers, useremail]
                          : [useremail];
                        const isLiked = tool?.upvotedusers
                          ? tool.upvotedusers.includes(useremail)
                            ? 1
                            : 0
                          : 0;
                        initiateLike(tool?.id, updatedUpvotedUsers, isLiked);
                      }}
                    >
                      {tool?.upvotes}
                      {isLoading == tool?.id ? (
                        <Loader2
                          fontSize={150}
                          className="animate-spin ml-[10px] text-[50px]"
                        />
                      ) : (
                        <BiSolidUpArrow
                          fontSize={30}
                          style={{
                            marginLeft: 10,
                            display: "inline",
                            fontWeight: "bolder",
                            fontSize: "30px",
                            color:
                              tool?.upvotedusers?.indexOf(
                                session?.data?.user?.email
                              ) >= 0
                                ? "black"
                                : "white",
                          }}
                        />
                      )}
                    </p>
                  </div>
                )}
              </div>

              <p
                className="font-light bg-wh text-slate-300"
                dangerouslySetInnerHTML={{
                  __html: isLoaded
                    ? tool?.description?.length <= 60
                      ? tool?.description
                      : tool?.description?.substring(0, 60)
                    : "loading...",
                }}
              />
              <div className="flex  flex-row gap-5">
                <Link className="bg-white/20 backdrop-blur-lg px-4 py-2 rounded-xl" href="/ai-social-media-assistant">
                  #{tool?.primarycategory}
                </Link>
                <a className="bg-gradient-to-br from-yellow-400 to-yellow-800 backdrop-blur-lg px-4 py-2 rounded-xl">Freemium</a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
