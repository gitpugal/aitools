import React from "react";
import Image from "next/image";

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
import { ArrowUpIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";

const CardList = ({ tool, authHandler, isCategory }) => {
  const [isLoading, setIsLoading] = React.useState("");
  const [tools, setTools] = React.useState(tool);
  const session = useSession();

  async function initiateLike(id, email, isLiked) {
    setIsLoading(id);
    if (!session?.data?.user) {
      authHandler();
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
    <Box
      maxW={"5xl"}
      display={{ base: "block", md: "grid" }}
      gridTemplateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
      gap={4}
      rounded="md"
      p={2}
      textAlign="start"
      _hover={{ shadow: "amber.300", lg: { shadow: "lg" } }}
      bg="amber.50/30"
    >
      {tools?.map((tool) => (
        <Box
          sx={{
            borderRadius: "20px",
            overflow: "hidden",
            transition: "transform 0.3s, boxShadow 0.3s",
            "&:hover": {
              transform: "translateY(-10px)",
            },
          }}
          mb={3}
          key={tool?.id}
          border="1px"
          _hover={{ border: "1px", borderColor: "gray.500" }}
          borderColor={"gray.300"}
          backgroundColor={"blue.100"}
          position="relative"
        >
          <Box overflow="hidden">
            <Link
              aria-label="Tool Image"
              data-splitbee-event="Premium Card Open"
              data-splitbee-event-tool="Taplio"
              href={`/tools/${tool?.slug ? tool?.slug : "test"}`}
            >
              <Image
                src="/tools/taplio.webp"
                alt="Tool Image"
                width={500}
                height={281}
                className="images"
              />
            </Link>
            <Flex
              flexDir="column"
              justifyContent="end"
              width="full"
              height="fit-content"
            >
              <Box px={3} mb={12}>
                <Flex justify="space-between" alignItems="center">
                  <Flex
                    justify="space-between"
                    width={"100%"}
                    alignItems="center"
                    gap={2}
                  >
                    <Link
                      aria-label="Tool Name"
                      data-splitbee-event="Premium Card Open"
                      data-splitbee-event-tool="Taplio"
                      href={`/tools/${tool?.slug ? tool?.slug : "test"}`}
                    >
                      <Text
                        my={3}
                        fontSize="xl"
                        fontWeight="bold"
                        color="primary"
                      >
                        {tool?.name}
                      </Text>
                      <p className="text-green-400">oiuhjg</p>
                    </Link>
                    {!isCategory && (
                      <Flex alignItems="center">
                        <Badge
                          bg={`${
                            tool?.upvotedusers != null &&
                            tool?.upvotedusers?.indexOf(
                              session?.data?.user?.email
                            ) >= 0
                              ? "white"
                              : "blue.500"
                          }`}
                          color={`${
                            tool?.upvotedusers != null &&
                            tool?.upvotedusers?.indexOf(
                              session?.data?.user?.email
                            ) >= 0
                              ? "blue.500"
                              : "white"
                          }`}
                          fontSize="18px"
                          px={3}
                          py={1}
                          rounded="md"
                          onClick={() => {
                            const useremail = session?.data?.user?.email;
                            if (!useremail) {
                              authHandler();
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
                            initiateLike(
                              tool?.id,
                              updatedUpvotedUsers,
                              isLiked
                            );
                          }}
                          cursor={"pointer"}
                        >
                          {tool?.upvotes} upvotes
                          {isLoading == tool?.id ? (
                            <Spinner />
                          ) : (
                            <ArrowUpIcon
                              fontSize={30}
                              borderRadius={4}
                              style={{
                                marginLeft: 10,
                                display: "inline",
                                fontWeight: "bolder",
                                fontSize: "30px",
                                color:
                                  tool?.upvotedusers?.indexOf(
                                    session?.data?.user?.email
                                  ) >= 0
                                    ? "#3182ce"
                                    : "white",
                              }}
                            />
                          )}
                        </Badge>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
                <Link
                  _hover={{ textDecoration: "none" }}
                  aria-label="Tool Description"
                  data-splitbee-event="Premium Card Open"
                  data-splitbee-event-tool="Taplio"
                  href={`/tools/${tool?.slug ? tool?.slug : "test"}`}
                >
                  <Text fontSize="sm" noOfLines={3}>
                    {tool?.description}
                  </Text>
                </Link>
              </Box>
              <Box
                position={!isCategory ? "absolute" : "relative"}
                bottom="0"
                width="full"
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-start"}
                  gap={2}
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  px={3}
                  mb={3}
                >
                  <Link href="/ai-social-media-assistant">
                    <Badge
                      bg="blue.500"
                      color="white"
                      fontSize="11px"
                      mt={2}
                      py={2}
                      px={4}
                      rounded="md"
                    >
                      {tool?.primarycategory}
                    </Badge>
                  </Link>
                  <Badge
                    bg="blue.500"
                    color="white"
                    fontSize="11px"
                    mt={2}
                    px={3}
                    py={2}
                    // colorScheme='blue'
                    rounded="md"
                    // breakWord="keep-all"
                  >
                    Freemium
                  </Badge>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CardList;
