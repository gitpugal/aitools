import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../../components/navbar";
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
import Footer from "../../components/footer";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { FiThumbsUp } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Home({ categories, slug }) {
  const router = useRouter();
  const [likes, setLikes] = useState(categories?.upvotes || 0);
  const s = slug;

  debugger;

  const session = useSession();
  async function initiateLike(id) {
    if (!session?.data?.user) {
      alert("please login into continue!");
    } else {
      try {
        const res = await fetch("/api/likeHandler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        });
        const data = await res.json();
        console.log(data);
        setLikes(data?.message[0].upvotes)
      } catch (err) {
        console.log(err);
      }
    }
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

      <Container maxW={"5xl"}>
        {/* Back button */}
        <Box
          mb={4}
          mt={4}
          cursor="pointer"
          display="inline-flex"
          alignItems="center"
          color="blue.500"
          _hover={{ color: "blue.700" }}
          onClick={() => router.back()}
        >
          <ArrowBackIcon mr={2} />
          Back
        </Box>

        {/* Tool image */}
        <Box mb={4}>
          <Image
            width={300}
            height={300}
            src={`/categories/ai_tools_applications.webp`}
            alt={"test"}
          />
        </Box>

        {/* Tool details */}
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            {categories?.name}
          </Heading>

          <Heading
            border={"5px"}
            borderColor={"black"}
            borderRadius={10}
            width={"fit-content"}
            bgColor={"powderblue"}
            px={5}
            py={3}
            as="h2"
            size="xl"
            display={"inline"}
            mb={4}
          >
            {likes} upvotes
          </Heading>
          <FiThumbsUp
            onClick={() => {
              initiateLike(categories?.id);
            }}
            style={{ display: "inline", marginLeft: 15 }}
            size={50}
          />

          <div
            style={{ marginTop: "20px", marginBottom: "20px" }}
            dangerouslySetInnerHTML={{ __html: categories.description }}
          ></div>
          <Box>
            {categories.length > 0 &&
              categories?.map((category) => (
                <Badge key={category.slug} mr={2} mb={2} colorScheme="blue">
                  {category.name}
                </Badge>
              ))}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  const url = context.req.url;
  const slug = url.substring(url.lastIndexOf("/") + 1); // Extract the last segment of the URL

  const res = await fetch(`http://api.aitoolsnext.com/getToolsBySlug/${slug}`);
  const data = await res.json();

  return {
    props: {
      categories: data,
      slug: slug ? slug : "",
    },
  };
}
