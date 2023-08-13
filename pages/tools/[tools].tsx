import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../../components/navbar";
import { Box, Heading, Container, Badge } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Footer from "../../components/footer";
import { ArrowBackIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { FiThumbsUp } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useState } from "react";


export default function Home({ categories, slug }) {
  const router = useRouter();
  const [likes, setLikes] = useState(categories?.upvotes || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };
  const s = slug;

  debugger;

  const session = useSession();
  async function initiateLike(id) {
    setIsLoading(true);
    if (!session?.data?.user) {
      setIsAddModalOpen(true);
      // alert("please login into continue!");
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
        setLikes(data?.message[0].upvotes);
      } catch (err) {
        console.log(err);
      }
    }

    setIsLoading(false);
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
        {
          <Box mb={4}>
            <Image
              width={300}
              height={300}
              src={`/categories/ai_tools_applications.webp`}
              alt={"test"}
            />
          </Box>
        }

        {/* Tool details */}
        <Box>
          <Heading mb={4}>{categories?.name}</Heading>

          <p style={{ fontWeight: "bolder", fontSize: "20px" }}>
            {likes} upvotes
            {isLoading ? (
              "    loading..."
            ) : (
              <ArrowUpIcon
                bgColor={"#0078d7"}
                fontSize={30}
                // sx={{ padding: 10 }}
                onClick={() => {
                  initiateLike(categories?.id);
                }}
                borderRadius={4}
                style={{
                  display: "inline",
                  marginLeft: 15,
                  fontWeight: "bolder",
                  fontSize: "35px",
                  color: "white",
                }}
              />
            )}
          </p>

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
