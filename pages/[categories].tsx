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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function Home({ categories }) {
  const router = useRouter();
  debugger;

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

      <Container  >
        {/* Back button */}
        <Box
          mb={6}
          mt={6}
          cursor="pointer"
          display="inline-flex"
          alignItems="center"
          color="#262626"
          _hover={{ color: "blue.700" }}
          onClick={() => router.back()}
        >
          <ArrowBackIcon mr={2} />
          Back
        </Box>

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
          <Box>
            {categories.length > 0 &&
              categories?.map((category) => (
                <Badge key={category.slug} mr={2} mb={2} colorScheme="blue">
                  {category.name}
                </Badge>
              ))}
          </Box>
        </Box>

        <Box
           
          mt={8}
          display={{ base: "block", md: "grid" }}
          gridTemplateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={4}
          rounded="md"
          p={2}
          textAlign="start"
          _hover={{ shadow: "amber.300", lg: { shadow: "lg" } }}
          bg="amber.50/30"
        >
          {/* <Text> {categories?.tools[0]?.name} </Text> */}
          {categories?.tools?.map((tool) => (
            <Box
              mb={3}
              key={tool?.id}
              border="1px"
              _hover={{ border: "1px", borderColor: "gray.500" }}
              borderColor={"gray.300"}
              backgroundColor={"yellow.200"}
              position="relative"
            >
              <Box overflow="hidden">
                <Link
                  aria-label="Tool Image"
                  data-splitbee-event="Premium Card Open"
                  data-splitbee-event-tool="Taplio"
                  href={`/tools/${tool?.slug ? tool?.slug : "test"}`}
                >
                  {/* Placeholder for image */}
                  <Image
                    src="/tools/taplio.webp" // Replace with the actual image path
                    alt="Tool Image"
                    width={500}
                    height={281}
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
                      <Flex justify="center" alignItems="center" gap={2}>
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
                        </Link>
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
                  <Box position="absolute" bottom="0" width="full">
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      position="absolute"
                      bottom="0"
                      left="0"
                      right="0"
                      px={3}
                      mb={3}
                    >
                      <Link href="/ai-social-media-assistant">
                        <Badge
                          bg="blue.400"
                          color="white"
                          fontSize="11px"
                          mt={2}
                          py={1}
                          px={2}
                          // colorScheme='blue'
                          rounded="md"
                          // breakWord="keep-all"
                        >
                          Social Media Assistant
                        </Badge>
                      </Link>
                      <Badge
                        bg="blue.400"
                        color="white"
                        fontSize="11px"
                        mt={2}
                        px={2}
                        py={1}
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
      </Container>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "https://www.aitoolsnext.com/api/getCategoriesBySlug/ai_tools_applications"
  );
  const data = await res.json();

  return {
    props: {
      categories: data,
    },
  };
}
