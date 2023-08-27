import React from "react";
import Image from "next/image";

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Link,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";
import {BiSolidUpArrow} from "react-icons/bi";

const CardList = ({ tool, authHandler, isCategory }) => {
  const [isLoading, setIsLoading] = React.useState("");
  const [tools, setTools] = React.useState(tool);
  const session = useSession();

  async function initiateLike(id, email, isLiked) {
    setIsLoading(id);
    if (!session?.data?.user) {
      document.getElementById("modal").style.visibility = "visible";
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
  return (
    <div className="w-screen  items-stretch px-3 lg:px-10    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {tools?.map((tool) => (
        // <div className=" w-3/4 ">
        <div className="w-full lg:w-3/4 my-5 lg:my-10 hover:shadow-none transition-all ease-in-out hover:-translate-y-2 hover:scale-95 cursor-pointer mx-auto shadow-2xl rounded-3xl flex flex-col  overflow-hidden">
          <Link
            aria-label="Tool Image"
            data-splitbee-event="Premium Card Open"
            data-splitbee-event-tool="Taplio"
            href={`/tools/${tool?.slug}`}
            className="h-full bg-black flex-1"
          >
            <Image
              src="/tools/taplio.webp"
              alt="Tool Image"
              width={500}
              height={281}
            />
          </Link>
          <div className="bg-gradient-to-tr from-slate-900 to-slate-600 flex-1 cursor-default p-0 gap-3 text-white flex flex-col mt-0 text-left px-10 py-10 min-w-full max-w-full  ">
            <div className="flex flex-row justify-between">
              <p className="text-3xl font-semibold">
                {tool?.name.charAt(0).toUpperCase() +
                  tool?.name.substr(1).toLowerCase()}
              </p>
              {!isCategory && (
                <div>
                  <Badge
                    className="div  flex items-center justify-center"
                    bg={`${
                      tool?.upvotedusers != null &&
                      tool?.upvotedusers?.indexOf(session?.data?.user?.email) >=
                        0
                        ? "white"
                        : "#4c4c4c"
                    }`}
                    color={`${
                      tool?.upvotedusers != null &&
                      tool?.upvotedusers?.indexOf(session?.data?.user?.email) >=
                        0
                        ? "#262626"
                        : "white"
                    }`}
                    fontSize="18px"
                    px={3}
                    py={1}
                    rounded="md"
                    onClick={() => {
                      const useremail = session?.data?.user?.email;
                      if (!useremail) {
                        document.getElementById("modal").style.visibility =
                          "visible";
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
                    cursor={"pointer"}
                  >
                    {tool?.upvotes}
                    {isLoading == tool?.id ? (
                      <Spinner />
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
                  </Badge>
                </div>
              )}
            </div>

            <p className="font-light text-slate-300">{tool?.description.length <= 60 ? tool?.description : tool?.description.substring(0, 60)}</p>
            <div className="flex  flex-row gap-5">
              <Link href="/ai-social-media-assistant">
                <Badge
                  bg="#4c4c4c"
                  color="white"
                  fontSize="11px"
                  mt={2}
                  py={2}
                  px={4}
                  rounded="md"
                  fontWeight={"light"}
                >
                  {tool?.primarycategory}
                </Badge>
              </Link>
              <Badge
                bg="#4c4c4c"
                color="white"
                fontSize="11px"
                fontWeight={"light"}
                mt={2}
                px={3}
                py={2}
                // colorScheme='blue'
                rounded="md"
                // breakWord="keep-all"
              >
                Freemium
              </Badge>
            </div>
          </div>
        </div>
        // </div>
      ))}
    </div>
  );
};

export default CardList;
