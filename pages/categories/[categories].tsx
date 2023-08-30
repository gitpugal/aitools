import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Link,
  Flex,
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
import { SearchIcon } from "@chakra-ui/icons";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { BiSolidUpArrow } from "react-icons/bi";

export default function Home({ categories }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState("");
  const [tools, setTools] = useState(categories?.tools);

  // debugger;
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

      <div className="w-screen px-5 relative py-10 flex flex-col items-center justify-center">
        {/* Back button */}
        <div
        className="absolute top-5 left-5"        
          onClick={() => router.back()}
        >
          <ArrowBackIcon mr={2} />
          Back
        </div>

        {/* Tool image */}
        {/* <Box mb={4}>
          <Image width={300} height={300} src={`/categories/ai_tools_applications.webp`} alt={'test'} />
        </Box> */}

        {/* Tool details */}
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            {categories?.name}
          </Heading>
          <Text fontSize="lg" mb={4}>
            {categories?.description}
          </Text>
          {/* <Box>
            {categories.length > 0 &&
              categories?.map((category) => (
                <Badge key={category.slug} mr={2} mb={2} colorScheme="blue">
                  {category.name}
                </Badge>
              ))}
          </Box> */}
        </Box>

        <div className="w-screen  items-stretch px-3 lg:px-10    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          {/* <Text> {categories?.tools[0]?.name} </Text> */}
          {tools?.map((tool) => (
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
                  {
                    <div>
                      <Badge
                        className="div  flex items-center justify-center"
                        bg={`${
                          tool?.upvotedusers != null &&
                          tool?.upvotedusers?.indexOf(
                            session?.data?.user?.email
                          ) >= 0
                            ? "white"
                            : "#4c4c4c"
                        }`}
                        color={`${
                          tool?.upvotedusers != null &&
                          tool?.upvotedusers?.indexOf(
                            session?.data?.user?.email
                          ) >= 0
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
                  }
                </div>

                <p className="font-light text-slate-300">
                  {tool?.description.length <= 60
                    ? tool?.description
                    : tool?.description.substring(0, 60)}
                </p>
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
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const url = context.req.url;
  const slug = url.substring(url.lastIndexOf("/") + 1); // Extract the last segment of the URL
  const res = await fetch(
    `https://www.aitoolsnext.com/api/getCategoriesBySlug/${slug}`
  );
  console.log(`https://www.aitoolsnext.com/api/getCategoriesBySlug/${slug}`);
  const data = await res.json();

  return {
    props: {
      categories: data,
    },
  };
}
